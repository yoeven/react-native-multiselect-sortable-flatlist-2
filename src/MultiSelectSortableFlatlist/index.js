import React from 'react';
import { View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class MultiSelectSortableFlatlist extends React.Component {
  static defaultProps = {
    onItemSelected: () => {},
    onItemDeselected: () => {},
    onItemTap: () => {},
    onSort: () => {},
    sortable: true,
    selectable: true,
    mode: 'auto',
    initialSelectedItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [...this.props.initialSelectedItems],
    };
  }

  AddSelectedIndex(item, index, drag = null) {
    const selected = this.IsItemSelected(item);
    if (!selected && this.props.selectable) {
      const selectedItems = this.state.selectedItems;
      selectedItems.push(item);
      this.setState({ selectedItems: selectedItems });
      this.props.onItemSelected({ selectedItems, item, index });
    }
    drag && this.props.sortable && drag();
  }

  OnTap(item, index) {
    const indexOfIndex = this.GetIndexofItem(item);
    const selectedItems = this.state.selectedItems;
    if (indexOfIndex > -1) {
      selectedItems.splice(indexOfIndex, 1);
      this.setState({ selectedItems: selectedItems });
      this.props.onItemDeselected({ selectedItems, item, index });
    } else if (selectedItems.length > 0) {
      this.AddSelectedIndex(item, index);
    } else {
      this.props.onItemTap({ item, index });
    }
  }

  DeselectAll() {
    this.setState({ selectedItems: [] });
    return [];
  }

  SelectAll() {
    this.setState({ selectedItems: [...this.props.data] });
    return [...this.props.data];
  }

  SelectionOverwrite(SelectedItems) {
    this.setState({ selectedItems: [...SelectedItems] });
  }

  GetIndexofItem(item) {
    if (this.props.comparingFactor) {
      return this.state.selectedItems.findIndex(comp => {
        return comp[this.props.comparingFactor] == item[this.props.comparingFactor];
      });
    } else {
      return this.state.selectedItems.indexOf(item);
    }
  }

  IsItemSelected(item) {
    if (this.props.comparingFactor) {
      return this.state.selectedItems.some(comp => {
        return comp[this.props.comparingFactor] == item[this.props.comparingFactor];
      });
    } else {
      return this.state.selectedItems.includes(item);
    }
  }

  OnSort(newDataOrder) {
    this.props.onSort(newDataOrder);
  }

  ReverseSelection(item, index) {
    const indexOfIndex = this.GetIndexofItem(item);
    const selectedItems = this.state.selectedItems;
    if (indexOfIndex > -1) {
      selectedItems.splice(indexOfIndex, 1);
      this.setState({ selectedItems: selectedItems });
      this.props.onItemDeselected({ selectedItems, item, index });
    } else {
      this.AddSelectedIndex(item, index);
    }
  }

  renderItem(item, index, drag, isActive) {
    var Component;
    const Mode = this.props.mode;
    if (Mode == 'auto') {
      Component = (
        <TouchableWithoutFeedback
          onPress={() => this.OnTap(item, index)}
          onLongPress={() => {
            this.AddSelectedIndex(item, index, drag);
          }}>
          <View>
            {this.props.renderItem({
              item,
              index,
              selected: this.IsItemSelected(item),
              isDragging: isActive,
            })}
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (Mode == 'manual') {
      Component = this.props.renderItem({
        item,
        index,
        selected: this.IsItemSelected(item),
        drag: drag,
        isDragging: isActive,
        reverseSelection: () => this.ReverseSelection(item, index),
      });
    }
    return Component;
  }

  render() {
    return (
      <DraggableFlatList
        {...this.props}
        onDragEnd={({ data }) => this.OnSort(data)}
        extraData={[this.state.selectedItems, { ...this.props.extraData }]}
        renderItem={({ item, index, drag, isActive }) => this.renderItem(item, index, drag, isActive)}
      />
    );
  }
}
