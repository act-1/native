import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { Box, Text } from '../';

function EventBox() {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : 'white' }]}>
      <Box flexDirection="row" padding="m">
        <Image style={styles.eventThumb} source={require('./event-thumb.jpg')} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="eventBoxDate">שבת בשעה 19:00</Text>
          <Text variant="eventBoxTitle">באנו חושך לגרש - הפגנת ענק בבלפור</Text>
          <Text variant="eventBoxLocation">כיכר פריז, ירושלים</Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default EventBox;

const styles = StyleSheet.create({
  eventThumb: {
    height: 50,
    width: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});
