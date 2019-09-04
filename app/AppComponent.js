import React, { PureComponent } from 'react';
import { View, NativeModules, NativeEventEmitter } from 'react-native';

import { ACGuide } from './components';

const { Dimensions } = NativeModules;

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

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
    return(
      <View style={{ flex: 1 }}>
        <ACGuide numRows={7} numColumns={5} />
      </View>
    );
  }
};

export default AppComponent;
