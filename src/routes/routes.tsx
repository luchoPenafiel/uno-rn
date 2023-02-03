// Vendor
import React, { ReactElement } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

// Vendor
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { Game, Leaderboard, Rules } from '@uno/screens';

// Theme
import theme from '@uno/constants/theme';

// Icons
import { MedalIcon, PageIcon, StarIcon } from '@uno/components/Icons';

const BottomTabs = createBottomTabNavigator();

const customStyles = {
  headerShown: false,
  cardStyle: { backgroundColor: theme.color.blue },
  tabBarStyle: {
    backgroundColor: theme.color.dark,
  },
  tabBarActiveTintColor: theme.color.red,
  tabBarInactiveTintColor: theme.color.white,
  colors: {
    background: 'red',
  },
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

export const Routes = () => {
  return (
    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#000' } }}>
      <BottomNavigator />
    </NavigationContainer>
  );
};
