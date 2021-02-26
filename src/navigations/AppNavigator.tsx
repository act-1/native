import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { EventPage, Onboarding } from '../screens';
import { RootStackParamList } from '../types/navigation';
import SignUpNavigator from './SignUpNavigator';
import NewPost from '@screens/NewPost';
import CheckInNavigator from './CheckInNavigator';
import { LocationPage } from '@screens/LocationPage';

import Icon from 'react-native-vector-icons/Feather';

enableScreens();

const MainStack = createNativeStackNavigator<RootStackParamList>();
const SecondaryStack = createNativeStackNavigator();
const AppStack = createStackNavigator<RootStackParamList>();

const RootStack = createNativeStackNavigator();

import AppTabs from './AppTabs';
import ProfileNavigator from './ProfileNavigator';

function AppStackScreen() {
  return (
    <AppStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: () => (
          <Icon
            name={'arrow-right'}
            size={28}
            color={'#fff'}
            style={{
              marginLeft: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <AppStack.Screen name="AppTabs" component={AppTabs} options={{ headerStyle: { backgroundColor: '#1e262d' } }} />
      <AppStack.Screen name="LocationPage" component={LocationPage} options={{ headerStyle: { backgroundColor: '#1e262d' } }} />
      <AppStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          gestureEnabled: true,
          headerShown: false,
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />

      {/* <AppStack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerShown: true,
          headerTitle: '',
          headerRightContainerStyle: { marginRight: 12 },
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'AtlasDL3.1AAA-Medium',
            color: '#EC534B',
            marginBottom: 8,
          },
          headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
        }}
      /> */}
    </AppStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator name="MainNavigator" screenOptions={{ stackPresentation: 'fullScreenModal' }}>
      <RootStack.Screen name="App" component={AppStackScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="ActionModal" component={CheckInNavigator} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}

function SecondaryNavigator() {
  return (
    <SecondaryStack.Navigator name="SecondaryNavigator" screenOptions={{ stackPresentation: 'modal' }}>
      <SecondaryStack.Screen name="ProfileModal" component={ProfileNavigator} options={{ headerShown: false }} />
    </SecondaryStack.Navigator>
  );
}

function AppNavigator() {
  const { userStore } = useStore();

  return (
    <RootStack.Navigator screenOptions={{ stackPresentation: 'modal' }}>
      {userStore.userData?.signupCompleted ? (
        <>
          <RootStack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
          <RootStack.Screen name="Secondary" component={SecondaryNavigator} options={{ headerShown: false }} />
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
