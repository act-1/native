import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventPage } from '../screens';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/Feather';

const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator();

import AppTabs from './AppTabs';

function MainStackScreen() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="AppTabs" component={AppTabs} />
      <MainStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'עמוד הפגנה',
          headerBackTitle: ' ',
          headerStyle: {
            backgroundColor: '#697CFF',
          },
          headerTintColor: '#fff',
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
    <RootStack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

export default AppNavigator;
