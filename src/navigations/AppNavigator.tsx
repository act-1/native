import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { EventPage } from '../screens';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/Feather';

enableScreens();

const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator();

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
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

export default AppNavigator;
