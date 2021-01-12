import React from 'react';
import { Text } from 'react-native';
import { Profile } from '../screens';
import { RootStackParamList } from '../types/navigation';
// import { createStackNavigator } from 'react-native-screens/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        options={{
          headerTitle: 'פרופיל',
          headerTitleStyle: { fontSize: 22, fontFamily: 'AtlasDL3.1AAA-Medium', color: '#6E7DFF' },
        }}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;
