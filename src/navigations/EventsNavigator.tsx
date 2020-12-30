import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventList, EventPage } from '../screens';

const EventsStack = createStackNavigator();

function EventsNavigator() {
  return (
    <EventsStack.Navigator headerMode="none">
      <EventsStack.Screen name="EventList" component={EventList} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
