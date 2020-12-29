import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator, EventsNavigator, LocationPageNavigator } from './';
// import { Home } from '../sceens';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'CheckIn':
            iconName = 'map-pin';
            break;
          case 'Events':
            iconName = 'calendar';
            break;
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#6E7DFF',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
  >
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="CheckIn" component={LocationPageNavigator} />
    <Tab.Screen name="Events" component={EventsNavigator} />
  </Tab.Navigator>
);

export default AppTabs;
