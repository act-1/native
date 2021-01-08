import React from 'react';
import { Text } from 'react-native';
import { Profile } from '../screens';
import { RootStackParamList } from '../types/navigation';
// import { createStackNavigator } from 'react-native-screens/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const SignUpStack = createNativeStackNavigator<RootStackParamList>();

const SignUpModal = () => <Text>Hi</Text>;

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen name="SignUpScreen" component={SignUpModal} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
