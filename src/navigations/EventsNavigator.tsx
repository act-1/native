import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventList, EventPage } from '../screens';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'Rubik-Medium',
          color: '#6E7DFF',
        },
      }}
    >
      <EventsStack.Screen name="EventList" options={{ title: 'אירועים קרובים' }} component={EventList} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
