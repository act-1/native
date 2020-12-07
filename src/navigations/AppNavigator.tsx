import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventPage } from '../screens';
import Icon from 'react-native-vector-icons/Feather';

const MainStack = createStackNavigator();

import AppTabs from './AppTabs';

function AppNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
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

export default AppNavigator;
