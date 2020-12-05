import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { Box, Text } from '../';

type EventBoxProps = {
  title: string;
  dateTime: string;
  location: string;
  thumbnailUrl: URL;
  onPress: () => void;
};

function EventBox({ title, dateTime, location, thumbnailUrl, onPress }: EventBoxProps) {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : 'white' }]} onPress={onPress}>
      <Box flexDirection="row" padding="m">
        <Image style={styles.eventThumb} source={{ uri: thumbnailUrl.href }} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="eventBoxDate" style={styles.textRTL}>
            {dateTime}
          </Text>
          <Text variant="eventBoxTitle" style={styles.textRTL}>
            {title}
          </Text>
          <Text variant="eventBoxLocation" style={styles.textRTL}>
            {location}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default EventBox;

const styles = StyleSheet.create({
  eventThumb: {
    width: 100,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textRTL: {
    writingDirection: 'rtl',
  },
});
