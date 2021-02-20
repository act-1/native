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

const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createNativeStackNavigator();

import AppTabs from './AppTabs';
import ActionNavigator from './ActionNavigator';

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerBackImage: () => (
          <Icon
            name={'arrow-right'}
            size={28}
            color={'#fff'}
            style={{ marginLeft: Platform.OS === 'ios' ? 8 : -4, marginBottom: Platform.OS === 'ios' ? 8 : 0 }}
            onPress={() => navigation.navigate('ActionScreen')} /** The goBack method doesn't work as expected on android **/
          />
        ),
      }}
      mode="card"
    >
      <MainStack.Screen name="AppTabs" component={AppTabs} options={{ headerStyle: { backgroundColor: '#1e262d' } }} />
      <MainStack.Screen name="LocationPage" component={LocationPage} options={{ headerStyle: { backgroundColor: '#1e262d' } }} />
      <MainStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          gestureEnabled: true,
          headerShown: false,
          headerBackTitle: ' ',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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
      />
      <MainStack.Screen
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
      />
      {/* <RootStack.Screen name="SignUpNavigator" component={SignUpNavigator} /> */}
    </MainStack.Navigator>
  );
}

function AppNavigator() {
  const { userStore } = useStore();

  return (
    <RootStack.Navigator screenOptions={{ stackPresentation: 'fullScreenModal' }}>
      {userStore.userData?.signupCompleted ? (
        <>
          <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="ActionModal" component={CheckInNavigator} options={{ headerShown: false }} />
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
