import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box } from '../';
import LottieView from 'lottie-react-native';

function UploadBanner() {
  const { feedStore } = useStore();
  const [uploadText, setUploadText] = useState('מעלה תמונה...');
  const progress = useRef(new Animated.Value(0)).current;
  const fadeOutInText = useRef(new Animated.Value(1)).current;

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
        duration: 1500,
        delay: 150,
        useNativeDriver: true,
      }).start();

      Animated.timing(fadeOutInText, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        setUploadText('התמונה הועלתה בהצלחה!');
        Animated.timing(fadeOutInText, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setUploadText('מעלה תמונה...');
          }, 5000);
        });
      });
    }
  }, [feedStore.uploadStatus]);

  return (
    <Box style={styles.bannerWrapper}>
      <LottieView
        source={require('@assets/uploading-animation.json')}
        progress={progress}
        style={{ width: 50, marginRight: 8 }}
      />
      <Animated.Text style={[styles.bannerText, { opacity: fadeOutInText }]}>{uploadText}</Animated.Text>
    </Box>
  );
}

export default observer(UploadBanner);

const styles = StyleSheet.create({
  bannerWrapper: {
    top: 0,
    width: '100%',
    height: 70,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  bannerText: {
    fontFamily: 'AtlasDL3.1AAA-Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
});
