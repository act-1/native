import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
  return Math.floor(Math.random() * 80) + 1;
}

const { width: deviceWidth } = Dimensions.get('screen');
const boxWidth = 204; // Substract 12 margins

function FeaturedProtestBox({ city, locationName, attendingCount, thumbnail, onPress }: LiveLocationBoxProps) {
  return (
    <TouchableScale
      activeScale={0.96}
      friction={20}
      onPress={onPress}
      onPressIn={() => HapticFeedback.trigger('impactLight')}
      onPressOut={() => HapticFeedback.trigger('impactLight')}
      style={{ width: boxWidth, marginHorizontal: 12 }}
    >
      <FastImage
        style={{
          width: boxWidth,
          height: 160,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 6,
          borderRadius: 8,
        }}
        source={{ uri: thumbnail }}
      >
        <Box
          paddingVertical="s"
          width={'100%'}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <Text variant="boxTitle" fontSize={14} color="primaryColor" textAlign="center" marginBottom="xs">
            {attendingCount} מפגינים עכשיו
          </Text>
          <Box flexDirection="row">
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
      </FastImage>
      <Box alignItems="center" flex={1}>
        <Text variant="boxTitle" fontSize={16}>
          {locationName}
        </Text>
        <Text variant="boxSubtitle" fontSize={14}>
          {city}
        </Text>
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
    height: 30,
    width: 30,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0a0d0f',
    marginLeft: -8,
  },
});
