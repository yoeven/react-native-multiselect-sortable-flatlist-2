import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default class Header extends React.PureComponent {
  render() {
    return (
      <View>
        <TouchableNativeFeedback onPress={() => this.props.SelectAll()}>
          <View style={[styles.ButtonBase, { backgroundColor: '#2799EC' }]}>
            <Text style={styles.ButtonText}>Select All</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => this.props.DeselectAll()}>
          <View style={[styles.ButtonBase, { backgroundColor: '#0000F5' }]}>
            <Text style={styles.ButtonText}>Deselect All</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ButtonBase: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
});
