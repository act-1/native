import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
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
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'CheckIn') {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.checkInIconWrapper}
                onPress={() => {
                  if (userStore.hasActiveCheckIn) {
                    const locationId = userStore.lastCheckIn.locationId;
                    navigation.navigate('CheckInModal', { screen: 'LocationPage', params: { locationId } });
                  } else {
                    navigation.navigate('CheckInModal', { screen: 'SelectLocation' });
                  }
                }}
              >
                <Image source={require('@assets/icons/fist-icon.png')} style={styles.checkInIcon} />
              </TouchableOpacity>
            );
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
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     console.log('Tab bar press ');
        //     // Go directly to location page if the user has an active check in session.
        //     e.preventDefault();
        //     if (userStore.hasActiveCheckIn) {
        //       const locationId = userStore.lastCheckIn.locationId;
        //       navigation.navigate('CheckInModal', { screen: 'LocationPage', params: { locationId } });
        //     } else {
        //       navigation.navigate('CheckInModal', { screen: 'SelectLocation' });
        //     }
        //   },
        // })}
      />
      <Tab.Screen name="Events" component={EventsNavigator} />
    </Tab.Navigator>
  );
};

export default observer(AppTabs);

const styles = StyleSheet.create({
  checkInIconWrapper: {
    position: 'absolute',
    bottom: 12,
    height: 70,
    width: 70,
    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
    backgroundColor: '#6E7DFF',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
  checkInIcon: {
    width: 38,
    height: 36,
  },
});
