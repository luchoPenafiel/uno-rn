// Vendor
import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Screens
import { Game, NewGame, AddPoints } from '@uno/screens/Game/GameScreens';

// Contexts
import { GameContextProvider } from '@uno/contexts/GameContext';

// Theme
import theme from '@uno/constants/theme';
import { Player } from '@uno/types/player';

export enum GameRouteNames {
  GAME = 'game',
  NEW_GAME = 'newGame',
  ADD_POINTS = 'addPoints',
}

export type GameStackParamList = {
  [GameRouteNames.GAME]: undefined;
  [GameRouteNames.NEW_GAME]: undefined;
  [GameRouteNames.ADD_POINTS]: { player: Player };
};

type ProfileScreenNavigationProp = StackNavigationProp<GameStackParamList>;
type ProfileScreenRouteProp = RouteProp<GameStackParamList, GameRouteNames.ADD_POINTS>;

export type GameScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const Stack = createStackNavigator<GameStackParamList>();

export const GameStack = () => {
  return (
    <GameContextProvider>
      <Stack.Navigator
        initialRouteName={GameRouteNames.NEW_GAME}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: theme.color.white },
        }}>
        <Stack.Screen name={GameRouteNames.GAME} options={{ gestureEnabled: false }} component={Game} />
        <Stack.Screen name={GameRouteNames.NEW_GAME} component={NewGame} />
        <Stack.Screen name={GameRouteNames.ADD_POINTS} component={AddPoints} />
      </Stack.Navigator>
    </GameContextProvider>
  );
};
