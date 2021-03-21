import React from 'react';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignUpLanding from '../screens/SignUp/SignUpLanding';
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
        headerShown: true,
        headerBackground: () => null,
        headerBackTitleVisible: false,
        cardStyle: {
          paddingTop: Platform.select({ ios: 0, android: 40 }),
          paddingBottom: insets.bottom + 10,
          backgroundColor: '#111112',
        },
        headerTintColor: 'rgba(255,0,0,0.5)',
        headerTitle: '',
        headerLeftContainerStyle: { marginLeft: 6 },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <SignUpStack.Screen name="SignUpLanding" component={SignUpLanding} options={{ headerShown: false }} />
      <SignUpStack.Screen name="SignUpHello" component={SignUpHello} />
      <SignUpStack.Screen name="SignUpPronoun" component={SignUpPronoun} />
      <SignUpStack.Screen name="SignUpProvince" component={SignUpProvince} />
      <SignUpStack.Screen name="SignUpCompleted" component={SignUpCompleted} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
