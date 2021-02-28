import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const sendingIcon = require('@assets/icons/sending.png');

function SendingIcon() {
  const spinValue = useRef(new Animated.Value(0)).current;

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return <Animated.Image source={sendingIcon} style={{ transform: [{ rotate: spin }], width: 12, height: 12, marginLeft: 2 }} />;
}

export default React.memo(SendingIcon);
