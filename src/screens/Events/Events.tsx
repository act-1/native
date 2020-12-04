import React from 'react';
import { StatusBar, Image, SafeAreaView } from 'react-native';
import { Box, EventBox } from '../../components';

const thumb = require('../../components/EventBox/event-thumb.jpg');
const imageUrl = new URL(Image.resolveAssetSource(thumb).uri);

function EventsScreen() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Box justifyContent="center">
        <EventBox
          title="באנו חושך לגרש - הפגנת ענק בבלפור"
          dateTime="שבת בשעה 19:00"
          location="כיכר פריז, ירושלים"
          thumbnailUrl={imageUrl}
        />
      </Box>
    </SafeAreaView>
  );
}

export default EventsScreen;
