import React from 'react';
import { Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { Profile, EventPage, EventPictureList } from '../screens';

import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const ProfileStack = createStackNavigator<RootStackParamList>();

function ProfileNavigator() {
  const { userStore } = useStore();

  const userName = userStore.userData?.displayName;

  return (
    <ProfileStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 } }}>
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerTitleAlign: 'center',
          headerStatusBarHeight: 6,
          headerTitle: userName,
          headerTitleStyle: { fontSize: 22, fontFamily: 'AtlasDL3.1AAA-Medium', color: '#EC534B' },
        }}
        component={Profile}
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
