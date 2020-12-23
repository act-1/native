import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectLocation, CheckInPage } from '../screens/CheckIn';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator
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
      <EventsStack.Screen name="CheckInSelectLocation" component={SelectLocation} />
      <EventsStack.Screen name="CheckInPage" component={CheckInPage} options={{ headerShown: false }} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
