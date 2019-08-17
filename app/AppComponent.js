import React, { PureComponent } from 'react';
import { View, Text, FlatList, NativeModules, NativeEventEmitter } from 'react-native';
import { DeviceInfo, Input } from '@youi/react-native-youi';

import { ACGuide } from './components';

const schedules = require('./store/schedules.json');

const { Dimensions } = NativeModules;

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { width, height } = Dimensions.window;

    this.state = {
      isPortrait: height > width,
      window: {
        width,  
        height,
      },
    };

    // 0 = Landscape
    // 1 = Portrait
    // 2 = Auto
    // 3 = LandscapeRight
    // 4 = LandscapeLeft
    // 5 = PortraitUpright
    // 6 = AutoUpright

    NativeModules.OrientationLock.setRotationMode(6);

    this.dimensionsChangeEvent = new NativeEventEmitter(Dimensions);
  }

  componentDidMount = () => {
    this.dimensionsChangeEvent.addListener('change', this.handleOnOrientationChange);
  }

  componentWillUnmount = () => {
    this.dimensionsChangeEvent.removeListener('change', this.handleOnOrientationChange);
  }

  handleOnOrientationChange = ({ window }) => {
    this.setState({ window, isPortrait: window.height > window.width });
  }

  render = () => {
    const { width, height } = this.state.window;

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
        <ACGuide />
      </View>
    );
  }
};

export default AppComponent;
