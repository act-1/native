import React from 'react';
import { Image } from 'react-native';
import { Box, EventBox } from '../../components';

const thumb = require('../../components/EventBox/event-thumb.jpg');
const imageUrl = new URL(Image.resolveAssetSource(thumb).uri);

function EventsScreen() {
  return (
    <Box justifyContent="center">
      <EventBox
        title="באנו חושך לגרש - הפגנת ענק בבלפור"
        dateTime="שבת בשעה 19:00"
        location="כיכר פריז, ירושלים"
        thumbnailUrl={imageUrl}
      />
    </Box>
  );
}

export default EventsScreen;
