import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LocationScreenProps } from '@types/navigation';
import { HomeNavigator, EventsNavigator, LocationPageNavigator } from './';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
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
      <Tab.Screen
        name="CheckIn"
        component={LocationPageNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Go directly to location page if the user has an active check in session.
            e.preventDefault();

            navigation.navigate('CheckIn', { screen: 'LocationPage' });
          },
        })}
      />
      <Tab.Screen name="Events" component={EventsNavigator} />
    </Tab.Navigator>
  );
};

export default AppTabs;
