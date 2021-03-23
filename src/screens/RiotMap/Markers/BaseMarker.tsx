import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, PixelRatio, ViewStyle } from 'react-native';
import { Box } from '../../../components';
import { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';

const fontScale = PixelRatio.getFontScale();

type BaseMarkerProps = MarkerProps & {
  children: React.ReactChild;
  style?: ViewStyle;
  arrowFillColor?: string;
};

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

function BaseMarker({ coordinates, children, onPress, displayed, arrowFillColor = '#fff', style }: BaseMarkerProps) {
  const markerOpacity = useRef(new Animated.Value(1)).current;

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
    <AnimatedMarker coordinate={coordinates} style={{ opacity: markerOpacity }} onPress={onPress} stopPropagation={true}>
      <Box style={[styles.markerBox, style]}>{children}</Box>

      <Box style={[styles.arrowContainer]}>
        <Svg width={60 * fontScale} height={20 * fontScale} viewBox="0 0 12 12">
          <Path d="M 0 0 L 0 0 L 6 6 L 12 0" fill={arrowFillColor} strokeWidth={2} strokeLinecap="round" stroke="#DFDFDF" />
        </Svg>
      </Box>
    </AnimatedMarker>
  );
}

export default React.memo(BaseMarker);

const styles = StyleSheet.create({
  markerBox: {
    height: 60 * fontScale,
    width: 60 * fontScale,

    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 3.5,
    borderColor: '#DFDFDF',
    borderRadius: 4,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: -16.5 * fontScale,
  },
});
