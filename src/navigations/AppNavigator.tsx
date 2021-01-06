import React from 'react';
import { View, Text } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { EventPage } from '../screens';
import { RootStackParamList } from '../types/navigation';
import LocationPageNavigator from './LocationPageNavigator';

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
      <MainStack.Screen name="AppTabs" component={AppTabs} />
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
    </MainStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ stackPresentation: 'modal' }}>
      <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="CheckInModal" component={LocationPageNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

export default AppNavigator;
