// Vendor
import React from 'react';
import { StatusBar, LogBox } from 'react-native';

import { Routes } from '@uno/routes/routes';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </>
  );
};

export default App;
