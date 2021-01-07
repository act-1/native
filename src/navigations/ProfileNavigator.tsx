import React from 'react';
import { Text } from 'react-native';
import { Home } from '../screens';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const ProfileStack = createNativeStackNavigator<RootStackParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Home"
        options={{
          headerTitle: 'פרופיל',
          headerTitleStyle: { fontSize: 22, fontFamily: 'Rubik-Medium', color: '#6E7DFF' },
        }}
        component={Home}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigator;
