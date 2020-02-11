import React from 'react';
import { Alert, Text, StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectableCard from './compoenents/SelectableCard';
import Header from './compoenents/Header';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist-2';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ListData: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ItemsSelected: [],
    };
  }

  onItemPress(item) {
    Alert.alert('Alert', item + ' Pressed', [{ text: 'OK' }], {
      cancelable: true,
    });
  }

  onSelectionChanged(selectedItems) {
    this.setState({ ItemsSelected: selectedItems });
  }

  onSort(newListDataArray) {
    console.log('onsort');
    this.setState({ ListData: newListDataArray });
  }

  render() {
    return (
      <MultiSelectSortableFlatlist
        ref={MultiSelectSortableFlatlist => (this.MultiSelectSortableFlatlist = MultiSelectSortableFlatlist)}
        contentContainerStyle={styles.ListContainer}
        ListHeaderComponentStyle={styles.HeaderStyle}
        ListHeaderComponent={
          <Header
            SelectAll={() => this.MultiSelectSortableFlatlist.SelectAll()}
            DeselectAll={() => this.MultiSelectSortableFlatlist.DeselectAll()}
          />
        }
        data={this.state.ListData}
        keyExtractor={(item, index) => item}
        onItemTap={({ item, index }) => this.onItemPress(item)}
        onItemSelected={({ selectedItems, item, index }) => this.onSelectionChanged(selectedItems)}
        onItemDeselected={({ selectedItems, item, index }) => this.onSelectionChanged(selectedItems)}
        onSort={data => this.onSort(data)}
        renderItem={({ item, index, selected, isDragging }) => (
          //Note: To view selection changes, your component should take a prop that will render changes based on "selected" bool
          <SelectableCard Selected={selected} Dragging={isDragging}>
            <Text style={styles.CardText}>{item}</Text>
          </SelectableCard>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  ListContainer: {
    paddingTop: StatusBar.currentHeight + hp(2),
  },
  CardText: {
    textAlign: 'center',
  },
  HeaderStyle: {
    paddingHorizontal: wp(4),
  },
});
