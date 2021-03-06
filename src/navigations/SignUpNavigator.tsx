import React from 'react';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignUpHello from '../screens/SignUp/SignUpHello';
import SignUpPronoun from '../screens/SignUp/SignUpPronoun';
import SignUpProvince from '../screens/SignUp/SignUpProvince';

const SignUpStack = createStackNavigator<RootStackParamList>();

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { paddingTop: 100, paddingHorizontal: 24, backgroundColor: '#111112' },
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SignUpStack.Screen name="SignUpHello" component={SignUpHello} />
      <SignUpStack.Screen name="SignUpPronoun" component={SignUpPronoun} />
      <SignUpStack.Screen name="SignUpProvince" component={SignUpProvince} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
