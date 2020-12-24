import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../';

type EventBoxProps = {
  title: string;
  localDay: string;
  time: string;
  locationName: string;
  thumbnail: URL;
  onPress: () => void;
};

function EventBox({ title, localDay, time, locationName, thumbnail, onPress }: EventBoxProps) {
  return (
    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#e4e4e4' : 'white' }]} onPress={onPress}>
      <Box flexDirection="row" padding="m">
        <FastImage style={styles.eventThumb} source={{ uri: thumbnail.href }} />
        <Box alignItems="flex-start" flex={1}>
          <Text variant="boxInfo" style={styles.textRTL}>
            {localDay} בשעה {time}
          </Text>
          <Text variant="boxTitle" style={styles.textRTL}>
            {title}
          </Text>
          <Text variant="boxSubtitle" style={styles.textRTL}>
            {locationName}
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
