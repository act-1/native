import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LocationScreenProps } from '@types/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeNavigator, EventsNavigator, LocationPageNavigator, ProfileNavigator } from './';
import HapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Feather';

const icons: any = {
  Home: {
    iconName: 'home',
  },
  Live: {
    iconName: 'globe',
  },
  Events: {
    iconName: 'calendar',
  },
  Profile: {
    iconName: 'user',
  },
};

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const { userStore } = useStore();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'CheckIn') {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.checkInIconWrapper, { bottom: insets.bottom > 0 ? 10 : 18 }]}
                onPress={() => {
                  HapticFeedback.trigger('clockTick');
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
        activeTintColor: '#EC534B',
        inactiveTintColor: 'gray',
        showLabel: false,
        style: { backgroundColor: '#1e262d', borderTopWidth: 2, borderTopColor: '#33404b' },
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      {/* <Tab.Screen name="Live" component={HomeNavigator} /> */}
      <Tab.Screen name="CheckIn" component={LocationPageNavigator} />
      <Tab.Screen name="Events" component={EventsNavigator} />
      {/* <Tab.Screen name="Profile" component={ProfileNavigator} /> */}
    </Tab.Navigator>
  );
};

export default observer(AppTabs);

const styles = StyleSheet.create({
  checkInIconWrapper: {
    position: 'absolute',
    height: 67,
    width: 67,
    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
    borderWidth: 4,
    borderColor: '#32373d',
    backgroundColor: '#1e262d',
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 2,
  },
  checkInIcon: {
    width: 38,
    height: 35,
    tintColor: '#ffffff',
  },
});
