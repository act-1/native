import React from 'react';
import { Image, StyleSheet, PixelRatio } from 'react-native';
import { Box, Text } from '../../components';
import { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';

const fontScale = PixelRatio.getFontScale();

type ProtestMarkerProps = {
  coordinates: { latitude: number; longitude: number };
};

function ProtestMarker({ coordinates }: ProtestMarkerProps) {
  return (
    <Marker coordinate={coordinates}>
      <Box style={styles.markerBox}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/act1/image/upload/v1614841512/featured_pictures/balfur-rabaati.jpg' }}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Box
        position="absolute"
        top={-12.5}
        left={-10}
        backgroundColor="primaryColor"
        paddingHorizontal="s"
        paddingVertical="xxs"
        borderRadius={50}
      >
        <Text variant="smallText">100</Text>
      </Box>
      <Box position="absolute" bottom={-19 * fontScale} zIndex={30}>
        <Svg width={60 * fontScale} height={20 * fontScale} viewBox="0 0 12 12">
          <Path d="M 0 0 L 0 0 L 6 6 L 12 0" fill="#cccccc" strokeWidth={1} strokeLinecap="round" stroke="#cccccc" />
        </Svg>
      </Box>
    </Marker>
  );
}

export default React.memo(ProtestMarker);

const styles = StyleSheet.create({
  markerBox: {
    height: 60 * fontScale,
    width: 60 * fontScale,
    backgroundColor: '#cccccc',
    borderRadius: 4,
    padding: 3,
  },
});
