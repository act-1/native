import React from 'react';
import { Box, Text } from '../..';
import FastImage from 'react-native-fast-image';
import TouchableScale from 'react-native-touchable-scale';
import { formatUpcomingDate } from '@utils/date-utils';

type EventBoxProps = {
  title: string;
  shortTitle?: string;
  locationName: string;
  startDate: Date;
  city: string;
  attendingCount: number;
  thumbnail: string;
  compactThumbnail?: string;
  onPress: () => void;
};

function EventCompactBox({
  title,
  shortTitle,
  startDate,
  attendingCount,
  city,
  thumbnail,
  compactThumbnail,
  onPress,
}: EventBoxProps) {
  let upcomingDate = formatUpcomingDate(startDate);
  if (upcomingDate !== 'היום') {
    upcomingDate.replace('יום', '');
  }

  return (
    <TouchableScale activeScale={0.96} friction={20} onPress={onPress} style={{ marginHorizontal: 12 }}>
      <FastImage
        style={{ width: 154, height: 180, borderRadius: 8, justifyContent: 'flex-end', alignItems: 'center' }}
        source={{ uri: compactThumbnail || thumbnail }}
      >
        <Box
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          marginBottom="m"
          width={80}
          height={20}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.935)' }}
          borderRadius={4}
          elevation={4}
        >
          <Text variant="boxTitle" fontSize={14} color="mainBackground" textAlign="center">
            {upcomingDate}
          </Text>
        </Box>
      </FastImage>
      <Box alignItems="flex-start" flex={1} width={148}>
        <Text variant="boxSubtitle" fontSize={14} marginTop="xs">
          {city}
        </Text>
        <Text variant="boxTitle" fontSize={14}>
          {shortTitle || title}
        </Text>
        <Text variant="boxSubtitle" fontSize={14}>
          {attendingCount} יוצאים להפגין
        </Text>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(EventCompactBox);
