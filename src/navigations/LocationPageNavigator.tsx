import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SelectLocation, LocationPage } from '@screens/LocationPage';

const LocationStack = createStackNavigator();

function LocationPageNavigator() {
  return (
    <LocationStack.Navigator
      screenOptions={{
        title: 'צ׳ק אין',
        headerTintColor: '#697CFF',
        headerStyle: {
          backgroundColor: '#fafafa',
        },

        headerTitleStyle: {
          fontFamily: 'Rubik-Medium',
          fontWeight: '600',
        },
      }}
    >
      <LocationStack.Screen name="SelectLocation" component={SelectLocation} />
      <LocationStack.Screen
        name="LocationPage"
        component={LocationPage}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </LocationStack.Navigator>
  );
}

export default LocationPageNavigator;
