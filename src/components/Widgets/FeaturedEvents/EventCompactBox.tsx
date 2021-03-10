import React from 'react';
import { StyleSheet } from 'react-native';
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
  variant?: 'vertical' | 'horizontal';
  onPress: () => void;
};

function EventCompactBox({
  title,
  shortTitle,
  startDate,
  attendingCount,
  locationName,
  city,
  thumbnail,
  compactThumbnail,
  variant = 'vertical',
  onPress,
}: EventBoxProps) {
  let upcomingDate = formatUpcomingDate(startDate);

  if (upcomingDate !== 'היום') {
    upcomingDate.replace('יום', '');
  }

  const fontSize = variant === 'horizontal' ? 16 : 14;

  return (
    <TouchableScale
      activeScale={0.96}
      friction={20}
      onPress={onPress}
      style={[{ marginHorizontal: 12 }, styles[`${variant}Box`]]}
    >
      <FastImage
        style={{
          width: 154,
          height: 180,
          borderRadius: 8,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: variant === 'horizontal' && 12,
        }}
        source={{ uri: compactThumbnail || thumbnail }}
      >
        {variant === 'vertical' && (
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
        )}
      </FastImage>
      <Box alignItems="flex-start" flex={1} width={148}>
        <Text variant="boxSubtitle" fontSize={fontSize} marginTop="xs">
          {variant === 'horizontal' && locationName + ', '}
          {city}
        </Text>

        <Text variant="boxTitle" fontSize={fontSize}>
          {shortTitle || title}
        </Text>

        <Text variant="boxSubtitle" fontSize={fontSize}>
          {attendingCount} יוצאים להפגין
        </Text>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(EventCompactBox);

const styles = StyleSheet.create({
  verticalBox: {},
  horizontalBox: {
    flexDirection: 'row',
  },
});
