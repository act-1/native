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
        style: { backgroundColor: 'transparent', borderTopWidth: 2, borderTopColor: '#1e262d', opacity: 1 },
      }}
    >
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
    </Tab.Navigator>
  );
};

export default observer(AppTabs);
