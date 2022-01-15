// Vendor
import React, { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Game, Leaderboard, Rules } from '@uno/screens';

const BottomTabs = createBottomTabNavigator();

export const BottomNavigator = (): ReactElement => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Reglamento" component={Rules} options={{ title: 'Reglamento' }} />
      <BottomTabs.Screen name="Partida" component={Game} options={{ title: 'Partida' }} />
      <BottomTabs.Screen name="Posiciones" component={Leaderboard} options={{ title: 'Posiciones' }} />
    </BottomTabs.Navigator>
  );
};
