import React from 'react';
import { Box, Text } from '../../../../components';
import FastImage from 'react-native-fast-image';
import HapticFeedback from 'react-native-haptic-feedback';
import TouchableScale from 'react-native-touchable-scale';

type EventBoxProps = {
  title: string;
  locationName: string;
  city: string;
  attendingCount: number;
  thumbnail: string;
  onPress: () => void;
};

function EventCompactBox({ title, attendingCount, city, thumbnail, onPress }: EventBoxProps) {
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
        source={{ uri: thumbnail }}
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
            היום
          </Text>
        </Box>
      </FastImage>
      <Box alignItems="flex-start" flex={1} width={148}>
        <Text variant="boxSubtitle" fontSize={14} marginTop="xs">
          {city}
        </Text>
        <Text variant="boxTitle" fontSize={14}>
          {title}
        </Text>
        <Text variant="boxSubtitle" fontSize={14}>
          {attendingCount} יוצאים להפגין
        </Text>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(EventCompactBox);
