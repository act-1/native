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
  markerWidth?: number;
};

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

function BaseMarker({
  coordinates,
  children,
  onPress,
  displayed,
  arrowFillColor = '#fff',
  markerWidth = 60,
  style,
}: BaseMarkerProps) {
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
    <AnimatedMarker
      centerOffset={{ x: 0, y: -32.5 }}
      coordinate={coordinates}
      style={{ opacity: markerOpacity }}
      onPress={onPress}
      stopPropagation={true}
      tracksViewChanges={false}
    >
      <Box style={[styles.markerBox, { height: markerWidth * fontScale, width: markerWidth * fontScale }, style]}>{children}</Box>

      <Box style={[styles.arrowContainer]}>
        <Svg width={markerWidth * fontScale} height={20 * fontScale} viewBox="0 0 12 12">
          <Path d="M 0 0 L 0 0 L 6 6 L 12 0" fill={arrowFillColor} strokeWidth={2} strokeLinecap="round" stroke="#DFDFDF" />
        </Svg>
      </Box>
    </AnimatedMarker>
  );
}

export default React.memo(BaseMarker);

const styles = StyleSheet.create({
  markerBox: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#DFDFDF',
    borderRadius: 4,
    overflow: 'visible',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: -17 * fontScale,
  },
});
