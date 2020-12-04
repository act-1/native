import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventList, EventPage } from '../screens';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7254c8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <EventsStack.Screen name="EventList" options={{ title: 'הפגנות קרובות' }} component={EventList} />
      <EventsStack.Screen name="EventPage" options={{ headerShown: false }} component={EventPage} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
