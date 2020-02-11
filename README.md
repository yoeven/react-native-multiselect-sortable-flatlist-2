# React Native Multiselect Sortable FlatList

React Native FlatList with the ability to sort and select the list items.

<img src="https://i.imgur.com/4DvHoXY.gif" width="350" />

## Getting started

### Install
    npm install react-native-multiselect-sortable-flatlist --save
or

    yarn add react-native-multiselect-sortable-flatlist
    
### Usage

    import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';


## Example

### Simple Example (Minimum needed for component to work)
```js
<MultiSelectSortableFlatlist
  data={this.state.ListData}
  keyExtractor={(item, index) => item}
  onSort={data => this.onSort(data)}
  renderItem={({ item, index, selected }) => (
    //Note: To view selection changes, your component should take a prop that will render changes based on "selected" bool
    <View style={selected ? styles.selectedWrapper : styles.wrapper}>
      <View
        style={[
          styles.containerStyle,
          {
            borderColor: selected ? 'blue' : 'white',
            borderWidth: selected ? 1.5 : 0,
          },
        ]}>
        <Text style={styles.CardText}>{item}</Text>
      </View>
    </View>
  )}
/>
```
### Advance Example
 ```js
import React from 'react';
import { Alert, Text, StyleSheet, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SelectableCard from './compoenents/SelectableCard';
import Header from './compoenents/Header';
import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ListData: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      ItemsSelected: [],
    };
  }

  onItemPress(item) {
    Alert.alert('Alert', item + ' Pressed', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
      cancelable: true,
    });
  }

  onSelectionChanged(selectedItems) {
    this.setState({ ItemsSelected: selectedItems });
  }

  onSort(newListDataArray) {
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
        renderItem={({ item, index, selected }) => (
          //Note: To view selection changes, your component should take a prop that will render changes based on "selected" bool
          <SelectableCard Selected={selected}>
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
```

### Mobile Usage
 - Tap on your item to get onItemTap called.
 - Press and hold on an item to start selecting phase.
	 - After activating selecting phase, tap on any other item to select.
	 - Tapping on a selected item will deselect that item.
	 - Deselecting all items will stop selecting phase
 - Press and hold on an item and drag to move it.
	 - Drop the item anywhere to sort.

## API

### Props
| Name | Description | Default | Type |
|--|--|--|--|
| data | Exaxtly like react-native [FlatList data prop](https://facebook.github.io/react-native/docs/flatlist#data). An array of data to pass your rendered components. | None **(Required)** | Array |
| renderItem | `renderItem={({ item: object, index: number, selected: bool }) => <YourComponent selected={selected} />}`. Similar to react-native [FlatList renderItem](https://facebook.github.io/react-native/docs/flatlist#renderitem), it provides both the item and index varables along with a new varable called `selected`, which allows you to provide [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) as you see fit. | None **(Required)** | Func |
| keyExtractor | Exaxtly like react-native [FlatList keyExtractor prop](https://facebook.github.io/react-native/docs/flatlist#keyextractor). Used to extract a unique key for a given item at the specified index. Also import to give unique key for selection to differentiate each item.| None **(Required)** | Func |
| onItemTap | `({ item: object, index: number })  =>  void` Called when the touch is released. | None | Func |
| onItemSelected | `({ selectedItems: array, item: object, index: number })  =>  void` Called when items are selected. | None | Func |
| onItemDeselected | `({ selectedItems: array, item: object, index: number })  =>  void` Called when items are deselected. | None | Func |
| onSort | `(data  =>  void)` Called when list is resorted with same data in new array data. | None | Func |
| comparingFactor | If data prop is an array of JSON Objects, you can pass a JSON key that would use the value for uniquely differentiating each item instead of using the item index number. | None | String |
| selectable | Enable or Disable all list items from being selected. | true | Bool |
| sortable | Enable or Disable list sorting ability. | true | Bool |
| scrollPercent | Sets where scrolling begins. A value of `5` will scroll up if the finger is in the top 5% of the FlatList container and scroll down in the bottom 5%. | 5 | Number |

### Functions
Use refs to call the functions on an instance of the component.

| Name | Description | Returns |
|--|--|--|
| SelectAll() | Selects all of the items in the list and returns an array. | Array |
| DeselectAll() | Deselects all of the items in the list and returns an array. | Array |

## Running the example expo app

 1. `git clone https://github.com/yoeven/react-native-multiselect-sortable-flatlist.git`
 2. `cd react-native-multiselect-sortable-flatlist/examples`
 3. `npm install or yarn`
 4. `npm start or yarn start`

## How to contribute
Check out this [simple tutorial](https://github.com/firstcontributions/first-contributions)
- Use prettier to format all code by running `yarn run format`.
- Test code locally by using examples project with expo or your project before requesting for a pull request.

## How to test locally

 1. After making changes to the project code, `cd` into the root of the project
 2. Run `npm pack` which will build a package file with an extension `.tgz`
 3. Now `cd` into your react-native project folder or the *examples* expo project folder and run `yarn add <filename>.tgz` or `npm install <filename>.tgz`
 4. Run your project and test it works
 5. If you are installing the package with the same version number, yarn and npm install the cached version instead, use `yarn cache clean` before adding the package into your project

## TODO

 - [ ] Expose functions for manual select and sort

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzIzMDI4NzkzXX0=
-->