import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/index';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { EventPage, EventPictureList, Onboarding } from '../screens';
import { RootStackParamList } from '../types/navigation';
import CheckInNavigator from './CheckInNavigator';
import { LocationPage } from '@screens/LocationPage';

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
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: { backgroundColor: '#1e262d' },
        headerTintColor: '#8a8a8b',
      }}
    >
      <AppStack.Screen name="AppTabs" component={AppTabs} />
      <AppStack.Screen name="LocationPage" component={LocationPage} />
      <AppStack.Screen name="EventPage" component={EventPage} />
      <AppStack.Screen
        name="EventPictureList"
        component={EventPictureList}
        options={{
          title: 'תמונות מההפגנה',
          headerShown: true,
          headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'AtlasDL3.1AAA-Bold',
            fontWeight: Platform.select({ ios: '700', android: null }),
            color: '#EC534B',
          },
        }}
      />
    </AppStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ stackPresentation: 'fullScreenModal' }}>
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
