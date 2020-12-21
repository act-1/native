import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventPage } from '../screens';
import { SelectLocation } from '../screens/CheckIn';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/Feather';

const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator();

import AppTabs from './AppTabs';

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={AppTabs} />
      <MainStack.Screen
        name="EventPage"
        component={EventPage}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: 'עמוד הפגנה',
          headerBackTitle: ' ',
          headerStyle: {
            backgroundColor: '#7254c8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name={'arrow-right'}
              size={28}
              color={'#fff'}
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </MainStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <RootStack.Screen name="Main" component={MainStackScreen} />
      <RootStack.Screen name="CheckIn" component={SelectLocation} />
    </RootStack.Navigator>
  );
}

export default AppNavigator;
