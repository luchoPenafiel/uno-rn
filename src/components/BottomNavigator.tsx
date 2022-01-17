// Vendor
import React, { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { Game, Leaderboard, Rules } from '@uno/screens';

// Theme
import theme from '@uno/constants/theme';

// Icons
import { MedalIcon, PageIcon, StarIcon } from '@uno/components/Icons';

const BottomTabs = createBottomTabNavigator();

const customStyles = {
  headerStyle: {
    backgroundColor: theme.color.darkGray,
    borderColor: 'red',
  },
  headerTintColor: theme.color.white,
  tabBarStyle: {
    backgroundColor: theme.color.darkGray,
  },
  tabBarActiveTintColor: theme.color.yellow,
  tabBarInactiveTintColor: theme.color.white,
};

export const BottomNavigator = (): ReactElement => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Partida"
      screenOptions={({ route }) => ({
        ...customStyles,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Reglamento') {
            return <PageIcon color={color} size={size} />;
          }
          if (route.name === 'Partida') {
            return <StarIcon color={color} size={size} />;
          }

          if (route.name === 'Posiciones') {
            return <MedalIcon color={color} size={size} />;
          }
        },
      })}>
      <BottomTabs.Screen name="Reglamento" component={Rules} options={{ title: 'Reglamento' }} />
      <BottomTabs.Screen name="Partida" component={Game} options={{ title: 'Partida' }} />
      <BottomTabs.Screen name="Posiciones" component={Leaderboard} options={{ title: 'Posiciones' }} />
    </BottomTabs.Navigator>
  );
};
