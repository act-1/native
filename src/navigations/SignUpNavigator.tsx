import React from 'react';
import { Platform, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SignUpLanding from '../screens/SignUp/SignUpLanding';
import SignUpHello from '../screens/SignUp/SignUpHello';
import SignUpPronoun from '../screens/SignUp/SignUpPronoun';
import SignUpRegion from '../screens/SignUp/SignUpRegion';
import SignUpCompleted from '../screens/SignUp/SignUpCompleted';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignUpStack = createStackNavigator<RootStackParamList>();

function SignUpNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <SignUpStack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: '#111112', shadowOpacity: 0 },
        cardStyle: {
          paddingBottom: insets.bottom + 10,
          backgroundColor: '#111112',
        },
        headerTintColor: 'rgba(255,0,0,0.5)',
        headerTitle: '',
        headerLeftContainerStyle: { marginLeft: 6 },
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    >
      <SignUpStack.Screen name="SignUpLanding" component={SignUpLanding} options={{ headerTransparent: true }} />
      <SignUpStack.Screen name="SignUpHello" component={SignUpHello} />
      <SignUpStack.Screen name="SignUpPronoun" component={SignUpPronoun} />
      <SignUpStack.Screen name="SignUpRegion" component={SignUpRegion} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;
