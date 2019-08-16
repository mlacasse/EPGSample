import React from 'react';
import { AppRegistry } from 'react-native';
import AppComponent from './app/AppComponent';

import { name as appName } from './app.json';

const YiReactApp = () => (
  <AppComponent />
);

AppRegistry.registerComponent(appName, () => YiReactApp);
