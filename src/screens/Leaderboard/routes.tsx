// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Leaderboard } from '@uno/screens/Leaderboard/LeaderboardScreens';

// Context
import { PlayerContextProvider } from '@uno/contexts/PlayersContext';

const Stack = createStackNavigator();

export const LeaderboardStack = () => {
  return (
    <PlayerContextProvider>
      <Stack.Navigator initialRouteName="leaderboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </PlayerContextProvider>
  );
};
