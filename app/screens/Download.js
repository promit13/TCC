import React from 'react';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {Button, View} from 'react-native';

let task;
class Download extends React.Component {
  startDownload = () => {
    task = RNBackgroundDownloader.download({
      id: 'Congo',
      url:
        'https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg',
      destination: `${RNBackgroundDownloader.directories.documents}/panorama.jpg`,
    })
      .begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        console.log('Download is done!');
      })
      .error((error) => {
        console.log('Download canceled due to error: ', error);
      });
  };

  pauseDownload = () => {
    task.pause();
  };

  resumeDownload = () => {
    task.resume();
  };

  stopDownload = () => {
    task.stop();
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={this.startDownload} title="Start" color="#841584" />
        <Button onPress={this.pauseDownload} title="Pause" color="#841584" />
        <Button onPress={this.resumeDownload} title="Resume" color="#841584" />
        <Button onPress={this.stopDownload} title="Stop" color="#841584" />
      </View>
    );
  }
}

export default Download;
