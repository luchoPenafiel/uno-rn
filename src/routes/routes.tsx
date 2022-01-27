// Vendor
import React, { ReactElement, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';

// Vendor
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { Game, Leaderboard, Rules } from '@uno/screens';
import { GameStackParamList } from '@uno/screens/Game/routes';

// Theme
import theme from '@uno/constants/theme';

// Icons
import { MedalIcon, PageIcon, StarIcon } from '@uno/components/Icons';

// Utils
import { trackScreen } from '@uno/utils/analytics';

const BottomTabs = createBottomTabNavigator();

const customStyles = {
  headerShown: false,
  cardStyle: { backgroundColor: theme.color.blue },
  tabBarStyle: {
    backgroundColor: theme.color.white,
  },
  tabBarActiveTintColor: theme.color.red,
  tabBarInactiveTintColor: theme.color.darkGray,
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
  const navigationRef = useRef<NavigationContainerRef<GameStackParamList>>(null);
  const routeNameRef = useRef('');

  return (
    <NavigationContainer
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await trackScreen(`${currentRouteName}`);
        }

        routeNameRef.current = `${currentRouteName}`;
      }}>
      <BottomNavigator />
    </NavigationContainer>
  );
};
