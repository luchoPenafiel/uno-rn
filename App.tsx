// Vendor
import React from 'react';
import { StatusBar, LogBox, Platform, UIManager } from 'react-native';

import { Routes } from '@uno/routes/routes';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

/**
 * LayoutAnimation is enabled by default on iOS, but it's still experimental on Android.
 * In order to enable LayoutAnimation on Android do this
 */
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
};

export default App;
