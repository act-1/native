import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { Profile, EventPage } from '../screens';

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
    </ProfileStack.Navigator>
  );
}

export default observer(ProfileNavigator);
