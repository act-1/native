import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import * as Animatable from 'react-native-animatable';

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

export default function LiveFeedEntry({ profilePicture, displayName, locationName }: LiveFeedEntry) {
  return (
    <Animatable.View animation="fadeIn">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="m"
        marginBottom="m"
        minHeight={45}
      >
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
        {/* <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Text variant="boxTitle" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
            10
          </Text>
          <Image
            source={require('@assets/icons/fist-action.png')}
            style={{ width: 25, marginLeft: 7.5, resizeMode: 'contain' }}
          />
        </Box> */}
      </Box>
    </Animatable.View>
  );
}

// function LiveFeedPictureEntry({ profilePicture, displayName, locationName, pictureUrl }: LiveFeedPictureEntry) {
//   return (
//     <FastImage style={{ width: '100%', height: 270 }} source={{ uri: pictureUrl }}>
//       <Box justifyContent="flex-end" height="100%">
//         <Box zIndex={2} flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="m">
//           <Box flexDirection="row" alignItems="center">
//             <FastImage source={{ uri: profilePicture }} style={styles.entryProfilePic} />
//             <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
//               {displayName}
//             </Text>
//             <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
//               {' '}
//               מפגינה עכשיו ב
//             </Text>
//             <Text variant="smallText" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
//               {locationName}
//             </Text>
//           </Box>
//           <Box flexDirection="row" justifyContent="center" alignItems="center">
//             <Text variant="boxTitle" fontSize={fontSize} maxFontSizeMultiplier={1.1}>
//               10
//             </Text>
//             <Image
//               source={require('@assets/icons/fist-action.png')}
//               style={{ width: 25, marginLeft: 7.5, resizeMode: 'contain' }}
//             />
//           </Box>
//         </Box>
//         <BlurView blurAmount={1} style={styles.blurView} />
//       </Box>
//     </FastImage>
//   );
// }

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
