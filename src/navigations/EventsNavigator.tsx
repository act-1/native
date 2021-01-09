import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventList } from '../screens';

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
          color: '#EC534B',
        },
        headerStyle: { backgroundColor: '#040506', shadowOpacity: 0 },
      }}
    >
      <EventsStack.Screen name="EventList" options={{ title: 'אירועים קרובים' }} component={EventList} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
