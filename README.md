# React Native Multiselect Sortable FlatList 2

> A performant and smooth React Native FlatList that is sortable with the ability to select multiple list items and is built on top of [react-native-draggable-flatlist](https://github.com/computerjazz/react-native-draggable-flatlist)

<img src="https://i.imgur.com/4DvHoXY.gif" width="350" />

## Getting started

### Install
    npm install react-native-multiselect-sortable-flatlist-2 --save
or

    yarn add react-native-multiselect-sortable-flatlist-2
    
### Usage

    import MultiSelectSortableFlatlist from 'react-native-multiselect-sortable-flatlist';


## Examples

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
            height: 80
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
```

### Manual Mode Example
```js
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
        mode="manual"
        data={this.state.ListData}
        keyExtractor={(item, index) => item}
        onItemSelected={({ selectedItems, item, index }) => this.onSelectionChanged(selectedItems)}
        onItemDeselected={({ selectedItems, item, index }) => this.onSelectionChanged(selectedItems)}
        onSort={data => this.onSort(data)}
        renderItem={({ item, index, selected, drag, isDragging, reverseSelection }) => (
          //Create your Touchable component and control both selectability and sortability through exposed functions.
          <TouchableWithoutFeedback onPress={() => reverseSelection()} onLongPress={() => drag()}>
            <View>
              <SelectableCard Selected={selected} Dragging={isDragging}>
                <Text style={styles.CardText}>{item}</Text>
              </SelectableCard>
            </View>
          </TouchableWithoutFeedback>
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

## Mobile Usage 

### Auto Mode
 - Tap on an item to trigger `onItemTap` call back.
 - Press and hold on an item to start selecting phase.
	 - After activating selecting phase, tap on any item to select.
	 - Tapping on a selected item will deselect that item.
	 - Deselecting all items will stop selecting phase.
 - Press and hold on an item and drag to move it.
	 - Drop the item anywhere to sort.

### Manual Mode
- All controls are managed by calling exposed functions for each item in the `renderItem` prop.
	- Changing `mode` prop to `"manual"` will stop all Auto mode controls. 

## API

### Props
| Name | Description | Default | Type |
|--|--|--|--|
| data | Exaxtly like react-native [FlatList data prop](https://facebook.github.io/react-native/docs/flatlist#data). An array of data to pass your rendered components. | None **(Required)** | Array |
| renderItem | `renderItem={({ item: object, index: number, selected: bool, isDragging: bool }) => <YourComponent selected={selected} />}`. Similar to react-native [FlatList renderItem](https://facebook.github.io/react-native/docs/flatlist#renderitem), it provides both the item and index varables along with a new varable called `selected`, which allows you to provide [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) as you see fit. | None **(Required)** | Func |
| keyExtractor | Exaxtly like react-native [FlatList keyExtractor prop](https://facebook.github.io/react-native/docs/flatlist#keyextractor). Used to extract a unique key for a given item at the specified index. Also import to give unique key for selection to differentiate each item.| None **(Required)** | Func |
| initialSelectedItems | An array of items that will be selected when component mounts. | None | Array |
| onItemTap | `({ item: object, index: number })  =>  void` Called when the touch is released. | None | Func |
| onItemSelected | `({ selectedItems: array, item: object, index: number })  =>  void` Called when items are selected. | None | Func |
| onItemDeselected | `({ selectedItems: array, item: object, index: number })  =>  void` Called when items are deselected. | None | Func |
| onSort | `(data  =>  void)` Called when list is resorted with same data in new array data. | None | Func |
| comparingFactor | If data prop is an array of JSON Objects, you can pass a JSON key that would use the value for uniquely differentiating each item instead of using the item index number. | None | String |
| selectable | Enable or Disable all list items from being selected. | true | Bool |
| sortable | Enable or Disable list sorting ability. | true | Bool |
| mode | Setting the mode to `"manual"` gives you full control on both sortability and selectability by exposing methods per item though the `renderItem` prop. When set to manual, the renderItem prop will look like this: `renderItem={({ item: object, index: number, selected: bool, drag: function, isDragging: bool, reverseSelection: function })`. Manual mode will ignore `selectable`, `sortable` and `onItemTap` props. | "auto" | String |

All [React Native Draggable FlatList](https://github.com/computerjazz/react-native-draggable-flatlist) and [FlatList props](https://facebook.github.io/react-native/docs/flatlist#props) props are available too as its the underlying component.

#### renderItem Prop Variables
| Name | Description | Type |
|--|--|--|
| item | The item from `data` being rendered. | Object |
| index | The index corresponding to this item in the `data` array. | Number |
| selected | If selection is active on the item. | Bool |
| drag | Call this to start the dragging process on the current item. | Func |
| isDragging | If item is currently being dragged. | Bool|
| reverseSelection | Call this to reverse the current selection of the item. If selected, item will become unselected and if unselected, item will become selected. | Func |

### Functions
Use refs to call the functions on an instance of the component.

| Name | Params |Description | Returns |
|--|--|--|--|
| SelectAll() | None |Selects all of the items in the list and returns an array. | Array |
| DeselectAll() | None |Deselects all of the items in the list and returns an array. | Array |
| SelectionOverwrite() | SelectedItems: array |Manually overwrite the current selection array with your own selection array with items passed to `data`. | Null |

## Running the example expo app

 1. `git clone https://github.com/yoeven/react-native-multiselect-sortable-flatlist-2.git`
 2. `cd react-native-multiselect-sortable-flatlist-2/examples`
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

