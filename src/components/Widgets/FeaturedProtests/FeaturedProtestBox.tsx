import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../..';
import FastImage from 'react-native-fast-image';
import HapticFeedback from 'react-native-haptic-feedback';
import TouchableScale from 'react-native-touchable-scale';

type LiveLocationBoxProps = {
  locationName: string;
  city: string;
  attendingCount: number;
  thumbnail: string;
  onPress: () => void;
};

function getRandomNumber() {
  return Math.floor(Math.random() * 60) + 1;
}

const boxWidth = 280; // Substract 12 margins

function FeaturedProtestBox({ city, locationName, attendingCount, thumbnail, onPress }: LiveLocationBoxProps) {
  return (
    <TouchableScale
      activeScale={0.96}
      friction={20}
      onPress={onPress}
      onPressIn={() => HapticFeedback.trigger('impactLight')}
      onPressOut={() => HapticFeedback.trigger('impactMedium')}
      style={{ width: boxWidth, marginHorizontal: 12 }}
    >
      <FastImage
        style={{
          width: boxWidth,
          height: 146,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 6,
          borderRadius: 4,
        }}
        source={{ uri: thumbnail }}
      />

      <Box alignItems="flex-start" flex={1}>
        <Text variant="boxTitle" fontSize={16} marginBottom="xs">
          טקס פרישה לדורון ידיד
        </Text>
        <Text variant="boxSubtitle" fontSize={14} marginBottom="xs">
          {locationName}, {city}
        </Text>
        <Box width={'100%'} marginLeft="s">
          <Box flexDirection="row" alignItems="center">
            <FastImage
              source={{ uri: `https://i.pravatar.cc/150?img=${getRandomNumber()}` }}
              style={styles.attendingProfilePic}
            />
            <FastImage
              source={{ uri: `https://i.pravatar.cc/150?img=${getRandomNumber()}` }}
              style={styles.attendingProfilePic}
            />
            <FastImage
              source={{ uri: `https://i.pravatar.cc/150?img=${getRandomNumber()}` }}
              style={styles.attendingProfilePic}
            />
            <FastImage
              source={{ uri: `https://i.pravatar.cc/150?img=${getRandomNumber()}` }}
              style={styles.attendingProfilePic}
            />
            <FastImage
              source={{ uri: `https://i.pravatar.cc/150?img=${getRandomNumber()}` }}
              style={styles.attendingProfilePic}
            />
          </Box>
        </Box>
      </Box>
    </TouchableScale>
  );
}

export default React.memo(FeaturedProtestBox);

const styles = StyleSheet.create({
  communityStatsWrapper: {
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    backgroundColor: '#191919',
  },
  attendingProfilePic: {
    height: 32,
    width: 32,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#0a0d0f',
    marginLeft: -8,
  },
});
