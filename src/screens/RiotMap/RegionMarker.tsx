import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Box, Text } from '../../components';
import { Marker, LatLng } from 'react-native-maps';

type RegionMarkerProps = {
  coordinates: LatLng;
  counter: number;
  displayed: boolean;
};

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

export default function RegionMarker({ coordinates, counter, displayed }: RegionMarkerProps) {
  const markerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (displayed) {
      Animated.timing(markerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    if (!displayed) {
      Animated.timing(markerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [displayed, markerOpacity]);

  return (
    <AnimatedMarker coordinate={coordinates} style={{ opacity: markerOpacity }}>
      <Box style={styles.markerContainer}>
        <Text variant="text" fontFamily="AtlasDL3.1AAA-Medium" fontSize={20} maxFontSizeMultiplier={1.1}>
          {counter}
        </Text>
      </Box>
    </AnimatedMarker>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eb524b',
    borderColor: '#ffc7c7',
    borderWidth: 2,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 4,
  },
});
