import React from 'react';
import { View, Text } from 'react-native';
import { EventBox } from '../../components';

function EventsScreen() {
  return (
    <View style={{ justifyContent: 'center' }}>
      <EventBox />
    </View>
  );
}

export default EventsScreen;
