import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../../../../components';
import { ParallaxImage } from 'react-native-snap-carousel';
import HapticFeedback from 'react-native-haptic-feedback';
import TouchableScale from 'react-native-touchable-scale';

const { width: screenWidth } = Dimensions.get('window');

type FeaturedPicturesProps = {
  locationName: string;
  date: string;
  authorName: string;
  authorPicture: string;
  url: string;
  pictureIndex: number;
  parallaxProps: any;
  onPress: () => void;
};

function FeaturedPictureBox({ url: pictureUrl, locationName, date, parallaxProps, onPress }: FeaturedPicturesProps) {
  return (
    <TouchableScale
      activeScale={0.99}
      friction={8}
      onPress={() => {
        HapticFeedback.trigger('impactLight');
        onPress();
      }}
      style={styles.item}
    >
      <ParallaxImage
        source={{ uri: pictureUrl }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.05}
        {...parallaxProps}
      />
      <Box style={styles.pictureInfo}>
        <Text variant="boxTitle" fontSize={16}>
          כיכר פריז
        </Text>
        <Text variant="text" fontSize={15} opacity={0.9}>
          לפני 24 דק׳
        </Text>
      </Box>
    </TouchableScale>
  );
}

export default FeaturedPictureBox;

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: 220,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#191919',
    borderRadius: 8,
  },
  image: {
    resizeMode: 'cover',
  },
  pictureInfo: {
    height: 50,
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,0.68)',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
});

// <Box flexDirection="row" alignItems="center">
//           <FastImage source={{ uri: 'https://randomuser.me/api/portraits/women/87.jpg' }} style={styles.pictureAuthorPicture} />
//           <Text variant="boxTitle" fontSize={15} maxFontSizeMultiplier={1.1}>
//             גאיה לוי
//           </Text>
//         </Box>

// pictureAuthorPicture: {
//   width: 28,
//   height: 28,
//   marginRight: 10,
//   borderRadius: 25,
// },
