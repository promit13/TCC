import React, {Component} from 'react';
import {View, Animated, Easing} from 'react-native';

export default class AnimateTest extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1440deg'],
      useNativeDriver: true,
    });

    return (
      <View style={styles.ViewStyle}>
        <Animated.Image
          style={[
            styles.coinStyle,
            {width: '100%', height: '100%', transform: [{rotateY: spin}]},
          ]}
          source={require('../../assets/tcc.jpg')}
        />
      </View>
    );
  }
}
const styles = {
  ViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
};
