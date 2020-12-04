import React from 'react';
import { StatusBar, Image, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, EventBox } from '../../components';

const EventsStack = createStackNavigator();

const thumb = require('../../components/EventBox/event-thumb.jpg');
const imageUrl = new URL(Image.resolveAssetSource(thumb).uri);

function EventsScreen() {
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
      <EventsStack.Screen
        name="EventList"
        options={{ title: 'הפגנות' }}
        component={() => (
          <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#6142b8" />
            <Box justifyContent="center">
              <EventBox
                title="באנו חושך לגרש - הפגנת ענק בבלפור"
                dateTime="שבת בשעה 19:00"
                location="כיכר פריז, ירושלים"
                thumbnailUrl={imageUrl}
              />
            </Box>
          </SafeAreaView>
        )}
      ></EventsStack.Screen>
    </EventsStack.Navigator>
  );
}

export default EventsScreen;
