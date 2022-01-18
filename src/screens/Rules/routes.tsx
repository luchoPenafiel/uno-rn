// Vendor
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import { Rules } from '@uno/screens/Rules/RulesScreens';

const Stack = createStackNavigator();

export const RulesStack = () => {
  return (
    <Stack.Navigator initialRouteName="rules" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="rules" component={Rules} />
    </Stack.Navigator>
  );
};
