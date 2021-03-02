import React, { useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

type FadeInOutViewProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
};

function FadeInOutView({ style, children }: FadeInOutViewProps) {
  const fadeInOut = useRef(new Animated.Value(1)).current;

  const sequence = Animated.sequence([
    Animated.timing(fadeInOut, {
      toValue: 0,
      duration: 1400,
      delay: 850,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInOut, {
      toValue: 1,
      duration: 1400,
      useNativeDriver: true,
    }),
  ]);

  React.useEffect(() => {
    Animated.loop(sequence).start();
  }, [sequence]);

  return <Animated.View style={[style, { opacity: fadeInOut }]}>{children}</Animated.View>;
}

export default FadeInOutView;
