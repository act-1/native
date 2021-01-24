import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Box, Text } from '../';
import LottieView from 'lottie-react-native';

export default function UploadBanner() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.8,
      duration: 7500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Box style={styles.bannerWrapper}>
      <LottieView
        source={require('@assets/uploading-animation.json')}
        progress={progress}
        style={{ width: 50, marginRight: 8 }}
      />
      <Text variant="boxTitle">מעלה תמונה...</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  bannerWrapper: {
    width: '100%',
    height: 70,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
