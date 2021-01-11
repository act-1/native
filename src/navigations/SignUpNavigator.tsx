import React from 'react';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpForm from '../screens/SignUp/SignUpForm';

const SignUpStack = createStackNavigator<RootStackParamList>();

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'Rubik-Medium',
          color: '#EC534B',
          marginBottom: Platform.OS === 'ios' ? 11 : 2,
        },
        headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
        headerStatusBarHeight: Platform.OS === 'ios' ? 12 : 0, // Modal height issues on iOS
      }}
    >
      <SignUpStack.Screen name="SignUpForm" component={SignUpForm} options={{ title: 'סיום הרשמה' }} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
