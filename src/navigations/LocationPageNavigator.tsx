import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectLocation, LocationPage } from '@screens/LocationPage';

const LocationStack = createStackNavigator();

function LocationPageNavigator() {
  return (
    <LocationStack.Navigator
      screenOptions={{
        title: 'צ׳ק אין',
        headerStyle: {
          backgroundColor: '#697CFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <LocationStack.Screen name="SelectLocation" component={SelectLocation} />
      <LocationStack.Screen name="LocationPage" component={LocationPage} options={{ headerShown: false }} />
    </LocationStack.Navigator>
  );
}

export default LocationPageNavigator;
