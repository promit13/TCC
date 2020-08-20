//This is an example code to Get the Clicked Position of Touch Screen Using PanResponder//
import React, {Component} from 'react';
//import react in our code.
import {StyleSheet, View, Platform, Text, PanResponder} from 'react-native';
//import all the components we are going to use.

export default class PanResponderTest extends Component {
  constructor() {
    super();
    //initialize state
    this.panResponder;
    this.state = {
      locationX: 0,
      locationY: 0,
    };
    //panResponder initialization
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
      onPanResponderGrant: (event, gestureState) => false,
      onPanResponderMove: (event, gestureState) => false,
      onPanResponderRelease: (event, gestureState) => {
        this.setState({
          //After the change in the location
          //state will be upated to re-render the screen and show the location in view
          locationX: event.nativeEvent.locationX.toFixed(2),
          locationY: event.nativeEvent.locationY.toFixed(2),
        });
      },
    });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}>
          {/*Text to show the screen location we get*/}
          <Text
            style={[
              {
                top: parseFloat(this.state.locationY - 15),
                left: parseFloat(this.state.locationX - 15),
              },
            ]}>
            X: {this.state.locationX}, Y: {this.state.locationY}
          </Text>
          {/*View to show green dot where user touched*/}
          <View
            style={[
              styles.point,
              {
                top: parseFloat(this.state.locationY - 2),
                left: parseFloat(this.state.locationX - 11),
              },
            ]}
          />
          {/*We will get the position of the touch on below View*/}
          <View
            style={{flex: 1, backgroundColor: 'transparent'}}
            {...this.panResponder.panHandlers}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 40,
  },
  childView: {
    flex: 1,
    overflow: 'hidden',
  },
  point: {
    height: 22,
    width: 22,
    marginTop: 5,
    position: 'absolute',
    borderRadius: 14,
    backgroundColor: '#00FF30',
  },
});
