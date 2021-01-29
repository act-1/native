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
      activeScale={0.98}
      friction={7}
      onPress={onPress}
      onPressIn={() => HapticFeedback.trigger('impactLight')}
      onPressOut={() => HapticFeedback.trigger('impactLight')}
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
            מחר
          </Text>
        </Box>
      </FastImage>
      <Box alignItems="flex-start" flex={1} width={148}>
        <Text variant="boxSubtitle" fontSize={14}>
          {city}
        </Text>
        <Text variant="boxTitle" fontSize={14}>
          {title} בעולם
        </Text>
        <Text variant="boxSubtitle" fontSize={14}>
          {attendingCount} יוצאים להפגין
        </Text>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(EventCompactBox);
