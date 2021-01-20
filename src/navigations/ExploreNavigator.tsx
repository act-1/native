import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Explore } from '../screens';

const ExploreStack = createStackNavigator();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
        },
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
      }}
    >
      <ExploreStack.Screen name="ExploreMain" options={{ title: 'אמ' }} component={Explore} />
    </ExploreStack.Navigator>
  );
}

export default ExploreNavigator;
