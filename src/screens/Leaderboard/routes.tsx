// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Leaderboard } from '@uno/screens/Leaderboard/LeaderboardScreens';

const Stack = createStackNavigator();

export const LeaderboardStack = () => {
  return (
    <Stack.Navigator initialRouteName="leaderboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="leaderboard" component={Leaderboard} />
    </Stack.Navigator>
  );
};
