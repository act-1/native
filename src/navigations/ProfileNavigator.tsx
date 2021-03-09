import React from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';

import { Platform } from 'react-native';
import { Profile, EventPage, EventPictureList, Settings } from '../screens';
import Icon from 'react-native-vector-icons/Feather';

import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator<RootStackParamList>();

function ProfileNavigator({ navigation }) {
  const { userStore } = useStore();

  const userName = userStore.userData?.displayName;

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
        headerTitleStyle: { fontSize: 22, fontFamily: 'AtlasDL3.1AAA-Medium', color: '#EC534B' },
        headerStatusBarHeight: 6,
        headerTintColor: '#8a8a8b',
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerTitleAlign: 'center',
          headerTitle: userName,
          headerBackTitle: 'פרופיל',
          headerRight: () => <Icon name="settings" color="#8a8a8b" size={24} onPress={() => navigation.navigate('Settings')} />,
          headerRightContainerStyle: { marginRight: 12, opacity: 0.75 },
        }}
        component={Profile}
      />
      <ProfileStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: 'הגדרות', headerBackTitleVisible: false }}
      />
      <ProfileStack.Screen name="EventPage" component={EventPage} options={{ headerShown: false }} />
      <ProfileStack.Screen
        name="EventPictureList"
        component={EventPictureList}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
          headerTintColor: '#8a8a8b',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'AtlasDL3.1AAA-Bold',
            fontWeight: Platform.select({ ios: '700', android: null }),
            color: '#EC534B',
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default observer(ProfileNavigator);
