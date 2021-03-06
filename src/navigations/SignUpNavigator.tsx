import React from 'react';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignUpHello from '../screens/SignUp/SignUpHello';
import SignUpPronoun from '../screens/SignUp/SignUpPronoun';
import SignUpProvince from '../screens/SignUp/SignUpProvince';
import SignUpIncitement from '../screens/SignUp/SignUpAvatar';
import SignUpCompleted from '../screens/SignUp/SignUpCompleted';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignUpStack = createStackNavigator<RootStackParamList>();

function SignUpNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          paddingTop: Platform.select({ ios: 20, android: 40 }) + insets.top,
          paddingHorizontal: 24,
          backgroundColor: '#111112',
        },
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SignUpStack.Screen name="SignUpHello" component={SignUpHello} />
      <SignUpStack.Screen name="SignUpPronoun" component={SignUpPronoun} />
      <SignUpStack.Screen name="SignUpProvince" component={SignUpProvince} />
      <SignUpStack.Screen name="SignUpIncitement" component={SignUpIncitement} />
      <SignUpStack.Screen name="SignUpCompleted" component={SignUpCompleted} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
