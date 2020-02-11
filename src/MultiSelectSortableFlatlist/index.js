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
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
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
    if (!this.props.selectable) return;
    this.setState({ selectedItems: [...this.props.data] });
    return [...this.props.data];
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

  render() {
    return (
      <DraggableFlatList
        {...this.props}
        onDragEnd={({ data }) => this.OnSort(data)}
        extraData={[this.state, { ...this.props.extraData }]}
        renderItem={({ item, index, drag, isActive }) => (
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
        )}
      />
    );
  }
}
