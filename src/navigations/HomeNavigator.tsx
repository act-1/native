import React from 'react';
import { Text } from 'react-native';
import { Home } from '../screens';
import { RootStackParamList } from '../types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          headerTitle: 'Act1',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 22, fontFamily: 'Rubik-Medium', color: '#6E7DFF' },
        }}
        component={Home}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
