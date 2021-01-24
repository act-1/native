import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text } from '../';
import LottieView from 'lottie-react-native';

function UploadBanner() {
  const { feedStore } = useStore();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (feedStore.uploadStatus === 'pending') {
      progress.setValue(0);
    }

    if (feedStore.uploadStatus === 'in_progress') {
      Animated.timing(progress, {
        toValue: 0.55,
        duration: 4700,
        easing: Easing.out(Easing.ease),
        delay: 600,
        useNativeDriver: true,
      }).start();
    }

    if (feedStore.uploadStatus === 'done') {
      Animated.timing(progress, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }).start();
    }
  }, [progress, feedStore.uploadStatus]);

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

export default observer(UploadBanner);

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
