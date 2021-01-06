import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LocationScreenProps } from '@types/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { HomeNavigator, EventsNavigator, LocationPageNavigator } from './';
import Icon from 'react-native-vector-icons/Feather';

const icons: any = {
  Home: {
    iconName: 'home',
  },
  CheckIn: {
    iconName: 'map-pin',
  },
  Events: {
    iconName: 'calendar',
  },
};

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { userStore } = useStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'CheckIn') {
            return <Icon name="map-pin" size={50} color={'#6E7DFF'} />;
          }
          const { iconName } = icons[route.name];
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
            if (userStore.hasActiveCheckIn) {
              const locationId = userStore.lastCheckIn.locationId;
              navigation.navigate('CheckInModal', { screen: 'LocationPage', params: { locationId } });
            } else {
              navigation.navigate('CheckInModal', { screen: 'SelectLocation' });
            }
          },
        })}
      />
      <Tab.Screen name="Events" component={EventsNavigator} />
    </Tab.Navigator>
  );
};

export default observer(AppTabs);
