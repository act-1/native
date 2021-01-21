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
          headerTitle: 'ACT1',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#0a0a0a', shadowOffset: { height: 0, width: 0 } },
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'AtlasDL3.1AAA-Bold',
            fontWeight: '700',
            letterSpacing: 0.4,
            color: '#EC534B',
          },
        }}
        component={Home}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
