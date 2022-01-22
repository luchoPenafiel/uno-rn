// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';

// Screens
import { Game, NewGame } from '@uno/screens/Game/GameScreens';

// Contexts
import { PlayerContextProvider } from '@uno/contexts/PlayersContext';
import { GameContextProvider } from '@uno/contexts/GameContext';

// Theme
import theme from '@uno/constants/theme';

export enum GameRouteNames {
  GAME = 'game',
  NEW_GAME = 'newGame',
}

export type GameStackParamList = {
  [GameRouteNames.GAME]: undefined;
  [GameRouteNames.NEW_GAME]: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<GameStackParamList>;

export type GameScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

const Stack = createStackNavigator<GameStackParamList>();

export const GameStack = () => {
  return (
    <PlayerContextProvider>
      <GameContextProvider>
        <Stack.Navigator
          initialRouteName={GameRouteNames.NEW_GAME}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: theme.color.white },
          }}>
          <Stack.Screen name={GameRouteNames.GAME} options={{ gestureEnabled: false }} component={Game} />
          <Stack.Screen name={GameRouteNames.NEW_GAME} component={NewGame} />
        </Stack.Navigator>
      </GameContextProvider>
    </PlayerContextProvider>
  );
};
