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

        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'Rubik-Medium',
          color: '#6E7DFF',
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
