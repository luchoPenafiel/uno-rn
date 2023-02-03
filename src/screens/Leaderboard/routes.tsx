// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Leaderboard } from '@uno/screens/Leaderboard/LeaderboardScreens';

// Theme
import theme from '@uno/constants/theme';

const Stack = createStackNavigator();

export const LeaderboardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="leaderboard"
      screenOptions={{ headerShown: false, cardStyle: { backgroundColor: theme.color.dark } }}>
      <Stack.Screen name="leaderboard" component={Leaderboard} />
    </Stack.Navigator>
  );
};
