import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { Profile } from '../screens';

import { RootStackParamList } from '../types/navigation';
// import { createStackNavigator } from 'react-native-screens/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

function ProfileNavigator() {
  const { userStore } = useStore();

  const userName = userStore.userData?.displayName;
  console.log(userName);
  return (
    <ProfileStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0a0a0a' } }}>
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerTitle: userName,
          headerTitleStyle: { fontSize: 22, fontFamily: 'AtlasDL3.1AAA-Medium', color: '#EC534B' },
        }}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
}

export default observer(ProfileNavigator);
