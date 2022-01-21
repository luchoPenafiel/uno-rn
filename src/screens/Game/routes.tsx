// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Game, NewGame } from '@uno/screens/Game/GameScreens';

// Context
import { PlayerContextProvider } from '@uno/contexts/PlayersContext';

// Theme
import theme from '@uno/constants/theme';

const Stack = createStackNavigator();

export const GameStack = () => {
  return (
    <PlayerContextProvider>
      <Stack.Navigator
        initialRouteName="newGame"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.color.white },
        }}>
        <Stack.Screen name="game" component={Game} />
        <Stack.Screen name="newGame" component={NewGame} />
      </Stack.Navigator>
    </PlayerContextProvider>
  );
};
