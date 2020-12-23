import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EventsNavigator, LocationPageNavigator } from './';
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
          case 'Home':
            iconName = 'home';
            break;
          case 'CheckIn':
            iconName = 'map-pin';
            break;
          case 'Feed':
            iconName = 'radio';
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
    <Tab.Screen name="Home" component={EventsNavigator} />
    <Tab.Screen name="Events" component={EventsNavigator} />
    <Tab.Screen name="CheckIn" component={LocationPageNavigator} />
    <Tab.Screen name="Feed" component={EventsNavigator} />
    <Tab.Screen name="Profile" component={EventsNavigator} />
  </Tab.Navigator>
);

export default AppTabs;
