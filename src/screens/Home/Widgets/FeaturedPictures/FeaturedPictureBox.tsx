import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../../../../components';
import FastImage from 'react-native-fast-image';
import { ParallaxImage, AdditionalParallaxProps } from 'react-native-snap-carousel';
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
  parallaxProps: AdditionalParallaxProps;
  onPress: (pictureIndex: number) => void;
};

function FeaturedPictureBox({
  url: pictureUrl,
  locationName,
  date,
  authorName,
  authorPicture,
  parallaxProps,
  pictureIndex,
  onPress,
}: FeaturedPicturesProps) {
  return (
    <TouchableScale
      activeScale={0.99}
      friction={8}
      onPress={() => {
        HapticFeedback.trigger('impactLight');
        onPress(pictureIndex);
      }}
      // onPressOut={() => HapticFeedback.trigger('impactLight')}
      style={styles.item}
    >
      {/* <FastImage
        style={{ width: 282, height: 136, borderRadius: 8, justifyContent: 'flex-end', alignItems: 'center' }}
        source={{ uri: pictureUrl }}
      > */}
      <ParallaxImage
        source={{ uri: pictureUrl }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.05}
        {...parallaxProps}
      />
      {/* <Box
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
      </Box> */}
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
});
