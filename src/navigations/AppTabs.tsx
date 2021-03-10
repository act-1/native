import React from 'react';
import { Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeNavigator, ActionNavigator, CommunityNavigator, EventsNavigator, ProfileNavigator } from './';
import TouchableScale from 'react-native-touchable-scale';
import HapticFeedback from 'react-native-haptic-feedback';
import Icon from 'react-native-vector-icons/Feather';
import ActionButton from '@screens/Action/ActionButton';

const { width: deviceWidth } = Dimensions.get('screen');

const icons: any = {
  Home: {
    iconName: 'home',
  },
  Community: {
    iconName: 'users',
  },
  Events: {
    iconName: 'calendar',
  },
  Profile: {
    iconName: 'user',
  },
};

const Tab = createBottomTabNavigator();

const AppTabs = ({ navigation }) => {
  const { checkInStore } = useStore();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
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

      <Tab.Screen
        name="Action"
        component={ActionNavigator}
        options={{
          tabBarButton: () => {
            return (
              <TouchableScale
                activeScale={0.92}
                friction={6}
                onPressIn={() => {
                  // Vibrate some android devices in an annoying way.
                  // Better leave it exclusively to iOS for now.
                  if (Platform.OS === 'ios') {
                    HapticFeedback.trigger('impactLight');
                  }
                }}
                onPressOut={() => {
                  if (Platform.OS === 'ios') {
                    HapticFeedback.trigger('impactMedium');
                  }
                }}
                onPress={() => {
                  if (checkInStore.hasActiveCheckIn) {
                    navigation.navigate('ProtestDashboard');
                  } else {
                    navigation.navigate('Secondary', { screen: 'CheckInModal' });
                  }
                }}
                style={[styles.checkInIconWrapper, { bottom: insets.bottom > 0 ? 30 : 35 }]}
              >
                <Image source={require('@assets/icons/fist-icon.png')} style={styles.checkInIcon} />
              </TouchableScale>
            );
          },
        }}
      />
      <Tab.Screen name="Community" component={CommunityNavigator} />

      {/* <Tab.Screen name="Events" component={EventsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} /> */}
    </Tab.Navigator>
  );
};

export default observer(AppTabs);

let actionTabButtonSize = Platform.select({ ios: 67, android: 70 });
let actionIconWidth = Platform.select({ ios: 38, android: 39 });
let actionIconHeight = Platform.select({ ios: 35, android: 37 });

if (deviceWidth > 400) {
  actionTabButtonSize = Platform.select({ ios: 71.5, android: 71.5 });
  actionIconWidth = 40;
  actionIconHeight = 37.5;
}

const styles = StyleSheet.create({
  checkInIconWrapper: {
    height: actionTabButtonSize,
    width: actionTabButtonSize,

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
    width: actionIconWidth,
    height: actionIconHeight,
    tintColor: '#ec534b',
  },
});
