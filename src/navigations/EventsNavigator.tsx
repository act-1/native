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
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
        },
        headerStyle: { backgroundColor: '#0a0a0a', shadowOpacity: 0 },
      }}
    >
      <EventsStack.Screen name="EventList" options={{ title: 'אירועים קרובים' }} component={EventList} />
    </EventsStack.Navigator>
  );
}

export default EventsNavigator;
