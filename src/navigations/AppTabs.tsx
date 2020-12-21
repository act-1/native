import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventsNavigator, CheckInNavigator } from './';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        switch (route.name) {
          case 'Events':
            iconName = 'calendar';
            break;

          case 'Map':
            iconName = 'map';
            break;

          case 'CheckIn':
            iconName = 'map-pin';
            break;

          case 'Inbox':
            iconName = 'inbox';
            break;
          case 'Profile':
            iconName = 'user';
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
    <Tab.Screen name="Map" component={EventsNavigator} />
    <Tab.Screen name="Events" component={EventsNavigator} />
    <Tab.Screen name="CheckIn" component={CheckInNavigator} />
    <Tab.Screen name="Inbox" component={EventsNavigator} />
    <Tab.Screen name="Profile" component={EventsNavigator} />
  </Tab.Navigator>
);

export default AppTabs;
