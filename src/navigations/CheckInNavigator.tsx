import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectLocation } from '../screens/CheckIn';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#697CFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <EventsStack.Screen name="CheckInLocation" options={{ title: 'צ׳ק אין' }} component={SelectLocation} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
