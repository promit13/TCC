import React from 'react';
import {PanoramaView} from 'react-native-panorama-view';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Draggable from 'react-native-draggable';
import {FloatingAction} from 'react-native-floating-action';
// import {PanoramaView, VideoView} from 'react-native-360';
// import {PanoramaView} from '@lightbase/react-native-panorama-view';
// import {RNHotspot, RNHotspotHelper} from 'react-native-hotspot';

import {
  ScrollView,
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

const image = require('../../assets/tcc.jpg');
let buttonActions = [];

const actions = [
  {
    color: 'green',
    text: 'Love My Garden Chef',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    name: 'bt_accessibility',
    position: 2,
  },
  {
    text: 'Guzzini',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    name: 'bt_language',
    position: 1,
  },
  {
    text: 'Kappa',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    name: 'bt_room',
    position: 3,
  },
  {
    text: 'Nutrifresh',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    name: 'bt_videocam',
    position: 4,
  },
  {
    color: 'Nava',
    text: 'Accessibility',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    name: 'bt_accessibility',
    position: 5,
  },
  {
    text: 'Zylish',
    icon: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    name: 'bt_language',
    position: 6,
  },
  // {
  //   text: 'Nerf',
  //   icon: require('../../assets/tcc.jpg'),
  //   name: 'bt_room',
  //   position: 7,
  // },
];

class PanoramaDetails extends React.Component {
  state = {
    pressed: false,
    loading: true,
  };
  componentDidMount() {
    buttonActions = actions.map((item, index) => {
      const {text, name, icon} = item;
      console.log(item);
      return {
        text,
        name,
        position: index,
        icon: {
          uri: 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
        },
      };
    });
    this.setState({loading: false});
    console.log(buttonActions);
    //  this.getPosition();
    // this.getPosition();
    Image.getSize(
      'http://reznik.lt/wp-content/uploads/2017/09/preview3000.jpg',
      (width, height) => {
        console.log(`The image dimensions are ${width}x${height}`);
      },
      (error) => {
        console.error(`Couldn't get the image size: ${error.message}`);
      },
    );
  }

  // in your screen's constructor, use the helper with an array of onPress actions you want your hotspots to trigger

  getPosition = () => {
    console.log('Ref', this._ref);
    this._ref.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height,
      };
      console.log(location);
    });
  };

  handlePress(evt) {
    Alert.alert(
      `x coord = ${evt.nativeEvent.locationX} y coord = ${evt.nativeEvent.locationY}`,
    );
  }

  render() {
    console.log(buttonActions);
    const {pressed, loading} = this.state;
    if (loading) return null;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/* <Draggable x={0} y={0}>
          {pressed ? null : (
            <View>
              <Button title="Click" style={{zIndex: 10, margin: -10}} />
              <Button title="Click" style={{zIndex: 10, margin: -10}} />
            </View>
          )}
          <View
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: 'blue',
            }}
          />
        </Draggable> */}
        <TouchableWithoutFeedback
          ref={(r) => {
            this._ref = r;
          }}
          onLayout={({nativeEvent}) => {
            console.log(nativeEvent.layout);
          }}
          onPressIn={(evt) => this.setState({pressed: true})}
          onPressOut={() => this.setState({pressed: false})}
          delayPressIn={250}>
          {/* <PanoramaView
            style={{height: 200, width: width}}
            image={require('../../assets/tcc.jpg')}
            displayMode={'embedded'}
            enableFullscreenButton
            enableCardboardButton
            enableTouchTracking
            hidesTransitionView
            enableInfoButton={false}
          /> */}
          <PanoramaView
            style={styles.viewer}
            dimensions={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
            inputType="mono"
            imageUrl="http://reznik.lt/wp-content/uploads/2017/09/preview3000.jpg"
            // imageUrl={`${RNBackgroundDownloader.directories.documents}/panorama.jpg`}
          />
        </TouchableWithoutFeedback>
        <FloatingAction
          actions={buttonActions}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    );
  }
}

// const PanoramaDetails = () => (
//   <View style={styles.container}>
//     <PanoramaView
//       ref={(r) => {
//         this._ref = r;
//       }}
//       style={styles.container}
//       dimensions={{
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//       }}
//       inputType="mono"
//       imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
//     />
//   </View>
// );

// const PanoramaDetails = () => (
//   <ScrollView style={styles.container} horizontal>
//     <Image
//       style={{
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//       }}
//       source={require('../../assets/tcc.jpg')}
//     />
//   </ScrollView>
// );

// const PanoramaDetails = () => (
//   <View style={styles.container}>
//     <VideoView
//       style={{height: 200, width: width}}
//       video={{
//         uri:
//           'https://raw.githubusercontent.com/googlevr/gvr-ios-sdk/master/Samples/VideoWidgetDemo/resources/congo.mp4',
//         type: 'stereo',
//       }}
//       displayMode={'embedded'}
//       volume={1}
//       enableFullscreenButton
//       enableCardboardButton
//       enableTouchTracking
//       hidesTransitionView
//       enableInfoButton={false}
//     />
//   </View>
// );

// const PanoramaDetails = () => (
//   <View style={styles.container}>
//     <PanoramaView
//       style={styles.viewer}
//       image={require('../../assets/tcc.jpg')}
//       displayMode={'embedded'}
//       enableFullscreenButton
//       enableCardboardButton
//       enableTouchTracking
//       hidesTransitionView
//       enableInfoButton={false}
//     />
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: Dimensions.get('window').height,
  },
});

export default PanoramaDetails;

//imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
