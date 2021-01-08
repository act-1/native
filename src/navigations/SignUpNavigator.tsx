import React from 'react';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpForm from '../screens/SignUp/SignUpForm';

const SignUpStack = createStackNavigator<RootStackParamList>();

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <SignUpStack.Screen name="SignUpScreen" component={SignUpForm} options={{ title: 'סיום הרשמה' }} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
