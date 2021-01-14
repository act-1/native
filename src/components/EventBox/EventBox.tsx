import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../';
import { formatLocalDay, formatShortDate, formatUpcomingDate } from '@utils/date-utils';
import { format } from 'date-fns';

type EventBoxProps = {
  title: string;
  startDate: Date;
  locationName: string;
  city: string;
  thumbnail: URL;
  variant?: 'thumbBox' | 'listBox';
  onPress: () => void;
};

function EventBox({ title, startDate, locationName, city, thumbnail, variant = 'listBox', onPress }: EventBoxProps) {
  const time = format(startDate, 'HH:mm');
  const localDay = formatLocalDay(startDate);

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? '#1e262d' : '#0B0D0F' },
        { transform: [{ scale: pressed && variant === 'thumbBox' ? 0.99 : 1 }] },
        styles[variant],
      ]}
      onPress={onPress}
    >
      <FastImage style={imageStyle[variant]} source={{ uri: thumbnail.href || thumbnail }} />
      <Box alignItems="flex-start" flex={1} style={eventInfo[variant]}>
        <Text variant="boxInfo" style={styles.textRTL}>
          {localDay} בשעה {time}
        </Text>
        <Text variant="boxTitle" style={styles.textRTL}>
          {title}
        </Text>
        <Text variant="boxSubtitle" style={styles.textRTL}>
          {locationName}, {city}
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
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
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
