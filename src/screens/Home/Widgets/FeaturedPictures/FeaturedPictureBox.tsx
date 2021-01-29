import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Box, Text } from '../../../../components';
import { Blurhash } from 'react-native-blurhash';
import { ParallaxImage } from 'react-native-snap-carousel';
import HapticFeedback from 'react-native-haptic-feedback';
import TouchableScale from 'react-native-touchable-scale';
import useImagePlaceholder from './useImagePlaceholder';

const AnimatedBlurHash = Animated.createAnimatedComponent(Blurhash);

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

function FeaturedPictureBox({ blurhash, pictureUrl, locationName, date, parallaxProps, onPress }: FeaturedPicturesProps) {
  const { onImageLoadEnd, onImageLoadError, placeholderOpacity, renderPlaceholder } = useImagePlaceholder();
  const blurhashStyle = useMemo(() => [styles.item, { opacity: placeholderOpacity }], [placeholderOpacity]);

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
        onLoad={onImageLoadEnd}
        onError={onImageLoadError}
        {...parallaxProps}
      />

      <Box style={styles.pictureInfo}>
        <Text variant="boxTitle" fontSize={16}>
          {locationName}
        </Text>
        <Text variant="text" fontSize={15} opacity={0.9}>
          לפני 24 דק׳
        </Text>
      </Box>

      <Box style={styles.blurhash}>
        {renderPlaceholder && (
          <AnimatedBlurHash blurhash={blurhash} decodeWidth={16} decodeHeight={16} resizeMode="cover" style={blurhashStyle} />
        )}
      </Box>
    </TouchableScale>
  );
}

export default React.memo(FeaturedPictureBox);

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
  blurhash: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
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
