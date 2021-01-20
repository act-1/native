import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { EventPage, Onboarding } from '../screens';
import { RootStackParamList } from '../types/navigation';
import SignUpNavigator from './SignUpNavigator';
import CheckInNavigator from './CheckInNavigator';

import Icon from 'react-native-vector-icons/Feather';

enableScreens();

const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator();

import AppTabs from './AppTabs';

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      mode="card"
    >
      <MainStack.Screen name="AppTabs" component={AppTabs} options={{ headerStyle: { backgroundColor: '#1e262d' } }} />
      <MainStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          gestureEnabled: true,
          headerShown: false,
          headerTitle: 'עמוד הפגנה',
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon name={'arrow-right'} size={28} color={'#fff'} style={{ marginLeft: 15 }} onPress={() => navigation.goBack()} />
          ),
        })}
      />
      {/* <RootStack.Screen name="SignUpNavigator" component={SignUpNavigator} /> */}
    </MainStack.Navigator>
  );
}

function AppNavigator() {
  const { userStore } = useStore();

  return (
    <RootStack.Navigator screenOptions={{ stackPresentation: 'modal' }}>
      {userStore.user || userStore.userData?.signupCompleted ? (
        <>
          <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="CheckInModal" component={CheckInNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="SignUpModal" component={SignUpNavigator} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <RootStack.Screen name="OnboardingModal" component={Onboarding} options={{ headerShown: false }} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default observer(AppNavigator);
