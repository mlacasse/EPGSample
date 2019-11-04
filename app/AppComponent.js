import React, { PureComponent } from 'react';
import { View, NativeModules } from 'react-native';

import { ACGuide } from './components';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    // 0 = Landscape
    // 1 = Portrait
    // 2 = Auto
    // 3 = LandscapeRight
    // 4 = LandscapeLeft
    // 5 = PortraitUpright
    // 6 = AutoUpright

    NativeModules.OrientationLock.setRotationMode(6);
  }

  render = () => {
    return(
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ACGuide duration={2.5}/>
      </View>
    );
  }
};

export default AppComponent;
