import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeNavigator, EventsNavigator, ActionNavigator, ProfileNavigator, CommunityNavigator } from './';
import TouchableScale from 'react-native-touchable-scale';
import HapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Feather';

const icons: any = {
  Home: {
    iconName: 'home',
  },
  Community: {
    iconName: 'users',
  },
  Events: {
    iconName: 'inbox',
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
          if (route.name === 'Action') {
            return (
              <TouchableScale
                activeScale={0.92}
                friction={6}
                onPressIn={() => HapticFeedback.trigger('impactLight')}
                onPressOut={() => HapticFeedback.trigger('impactMedium')}
                onPress={() => {
                  if (userStore.hasActiveCheckIn) {
                    const locationId = userStore.lastCheckIn.locationId;
                    navigation.navigate('ActionModal', { screen: 'LocationPage', params: { locationId } });
                  } else {
                    navigation.navigate('ActionModal', { screen: 'ActionScreen' });
                  }
                }}
                style={[styles.checkInIconWrapper, { bottom: insets.bottom > 0 ? 10 : 18 }]}
              >
                <Image source={require('@assets/icons/fist-icon.png')} style={styles.checkInIcon} />
              </TouchableScale>
            );
          }
          const { iconName } = icons[route.name];
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#dddddd',
        inactiveTintColor: '#475968',
        showLabel: false,
        style: { backgroundColor: '#0f1316', borderTopWidth: 2, borderTopColor: '#1e262d' },
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Action" component={ActionNavigator} />
      <Tab.Screen name="Community" component={CommunityNavigator} />
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
    backgroundColor: '#071516',
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 0.5,
    elevation: 2,
  },
  checkInIcon: {
    width: 38,
    height: 35,
    tintColor: '#ec534b',
  },
});
