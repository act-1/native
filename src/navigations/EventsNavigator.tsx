import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventList } from '../screens';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4e23bb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <EventsStack.Screen name="EventList" options={{ title: 'הפגנות קרובות' }} component={EventList} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
