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
  variant?: 'thumbBox' | 'listBox';
  onPress: () => void;
};

function EventBox({ title, localDay, time, locationName, thumbnail, variant = 'listBox', onPress }: EventBoxProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#e4e4e4' : 'white' },
        { transform: [{ scale: pressed && variant === 'thumbBox' ? 0.99 : 1 }] },
        styles[variant],
      ]}
      onPress={onPress}
    >
      <FastImage style={imageStyle[variant]} source={{ uri: thumbnail.href }} />
      <Box alignItems="flex-start" flex={1} style={eventInfo[variant]}>
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
    </Pressable>
  );
}

export default React.memo(EventBox);

const styles = StyleSheet.create({
  thumbBox: {
    width: 250,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    marginRight: 16,
  },
  listBox: {
    flexDirection: 'row',
    padding: 12,
  },
  thumbBoxImage: {
    width: '100%',
    height: 120,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  listBoxImage: {
    width: 100,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
  },
  thumbBoxInfo: {
    height: 95,
    padding: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  listBoxInfo: {},
  textRTL: {
    writingDirection: 'rtl',
    marginBottom: 1,
  },
});

const imageStyle = {
  listBox: styles.listBoxImage,
  thumbBox: styles.thumbBoxImage,
};

const eventInfo = {
  listBox: styles.listBoxInfo,
  thumbBox: styles.thumbBoxInfo,
};
