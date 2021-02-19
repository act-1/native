import React, { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

function FadeInOutView({ children }) {
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

  return <Animated.View style={{ opacity: fadeInOut }}>{children}</Animated.View>;
}

export default FadeInOutView;
