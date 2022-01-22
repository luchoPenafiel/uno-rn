// Vendor
import React from 'react';
import { StatusBar, LogBox, Platform, UIManager } from 'react-native';

// Contexts
import { AppContextProvider } from '@uno/contexts/AppContext';
import { PlayerContextProvider } from '@uno/contexts/PlayersContext';

// Routes
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
    <AppContextProvider>
      <PlayerContextProvider>
        <StatusBar barStyle="dark-content" />
        <Routes />
      </PlayerContextProvider>
    </AppContextProvider>
  );
};

export default App;
