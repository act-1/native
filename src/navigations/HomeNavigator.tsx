import React from 'react';
import { Text } from 'react-native';
import { Home } from '../screens';
import { RootStackParamList } from '../types/navigation';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          headerTopInsetEnabled: false,
          headerTitle: 'Act1',
          headerCenter: () => <Text style={{ fontSize: 22, fontFamily: 'Rubik-Medium', color: '#6E7DFF' }}>Act1</Text>,
          headerTitleStyle: { fontSize: 22, fontFamily: 'Rubik-Medium', color: '#6E7DFF' },
        }}
        component={Home}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
