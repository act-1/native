import React from 'react';
import { Box, Text } from '../..';
import FastImage from 'react-native-fast-image';
import HapticFeedback from 'react-native-haptic-feedback';
import TouchableScale from 'react-native-touchable-scale';
import { formatUpcomingDate } from '@utils/date-utils';
import { startBatch } from 'mobx/dist/internal';

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
  return (
    <TouchableScale
      activeScale={0.96}
      friction={20}
      onPress={onPress}
      onPressIn={() => HapticFeedback.trigger('impactLight')}
      onPressOut={() => HapticFeedback.trigger('impactLight')}
      style={{ marginHorizontal: 12 }}
    >
      <FastImage
        style={{ width: 154, height: 180, borderRadius: 8, justifyContent: 'flex-end', alignItems: 'center' }}
        source={{ uri: compactThumbnail || thumbnail }}
      >
        <Box
          backgroundColor="mainForeground"
          marginBottom="m"
          width={75}
          borderRadius={4}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
        >
          <Text variant="boxTitle" color="mainBackground" textAlign="center">
            {formatUpcomingDate(startDate).replace('יום', '')}
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
