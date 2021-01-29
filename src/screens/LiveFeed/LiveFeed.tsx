import React from 'react';
import { ScrollView, Image, StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';

let fontSize = 13.4;
const wideScreen = Dimensions.get('screen').width >= 390;

if (wideScreen) {
  fontSize = 14.5;
}

type LiveFeedEntry = {
  profilePicture: string;
  displayName: string;
  locationName: string;
};

type LiveFeedPictureEntry = LiveFeedEntry & {
  pictureUrl: string;
};

function LiveFeedEntry({ profilePicture, displayName, locationName }: LiveFeedEntry) {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between" paddingHorizontal="m" marginBottom="m">
      <Box flexDirection="row" alignItems="center">
        <FastImage source={{ uri: profilePicture }} style={styles.entryProfilePic} />
        <Box flexDirection="row">
          <Text variant="boxTitle" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
            {displayName}
          </Text>
          <Text variant="text" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
            {' '}
            מפגינה עכשיו ב
          </Text>
          <Text variant="text" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
            {locationName}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Text variant="boxTitle" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
          10
        </Text>
        <Image source={require('@assets/icons/fist-action.png')} style={{ width: 25, marginLeft: 7.5, resizeMode: 'contain' }} />
      </Box>
    </Box>
  );
}

function LiveFeedPictureEntry({ profilePicture, displayName, locationName, pictureUrl }: LiveFeedPictureEntry) {
  return (
    <FastImage style={{ width: '100%', height: 270 }} source={{ uri: pictureUrl }}>
      <Box justifyContent="flex-end" height="100%">
        <Box zIndex={2} flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="m">
          <Box flexDirection="row" alignItems="center">
            <FastImage source={{ uri: profilePicture }} style={styles.entryProfilePic} />
            <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
              {displayName}
            </Text>
            <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
              {' '}
              מפגינה עכשיו ב
            </Text>
            <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
              {locationName}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="center" alignItems="center">
            <Text variant="boxTitle" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
              10
            </Text>
            <Image
              source={require('@assets/icons/fist-action.png')}
              style={{ width: 25, marginLeft: 7.5, resizeMode: 'contain' }}
            />
          </Box>
        </Box>
        <BlurView blurAmount={1} style={styles.blurView} />
      </Box>
    </FastImage>
  );
}

export default function LiveFeed() {
  return (
    <ScrollView>
      <LiveFeedEntry
        profilePicture="https://randomuser.me/api/portraits/women/87.jpg"
        displayName="מלי לוי"
        locationName="צומת הרצליה"
      />
      <LiveFeedPictureEntry
        profilePicture="https://randomuser.me/api/portraits/women/80.jpg"
        displayName="חן יצחקי"
        locationName="צומת הרצליה"
        pictureUrl="https://images.globes.co.il/images/NewGlobes/big_image_800/2020/FD9FE066786FF3AE8199BFD492B9404C_800x392.20200725T213427.jpg"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  entryProfilePic: {
    width: 28,
    height: 28,
    marginRight: 10,
    borderRadius: 25,
  },
  blurView: {
    justifyContent: 'flex-end',
    height: 44,
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
