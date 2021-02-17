import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Box, Ticker } from '../';
import LottieView from 'lottie-react-native';

import HapticFeedback from 'react-native-haptic-feedback';

const heartAnimation = require('@assets/heart-animation.json');

type LikeButtonProps = {
  onPress: () => void;
  liked: boolean;
  likeCount: number;
  style?: ViewStyle;
};

function LikeButton({ onPress, liked, likeCount, style }: LikeButtonProps) {
  const lottieHeart = useRef<LottieView>(null);

  const buttonPress = () => {
    // Haptic feedback
    const hapticMethod = liked ? 'impactMedium' : 'impactLight';
    HapticFeedback.trigger(hapticMethod);

    // Run animation
    if (liked) {
      lottieHeart.current!.play(18, 28);
    } else {
      lottieHeart.current!.play(3, 14);
    }

    // Call callback
    onPress();
  };

  useEffect(() => {
    if (liked) {
      lottieHeart.current!.play(17, 18);
    }
  }, []);
  console.log('liked', liked);

  return (
    <Pressable onPress={buttonPress} accessibilityLabel="אהבתי" style={style}>
      <Box width="100%" flexDirection="row" alignItems="center">
        <Box paddingLeft="s" style={{ marginRight: 6 }}>
          <LottieView ref={lottieHeart} source={heartAnimation} style={{ width: 22.5 }} loop={false} speed={1} />
        </Box>
        <Ticker textStyle={{ ...styles.likeCount, color: liked ? '#eb524b' : '#999999' }}>{likeCount}</Ticker>
      </Box>
    </Pressable>
  );
}

export default LikeButton;

const styles = StyleSheet.create({
  likeCount: {
    color: '#999999',
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 16,
  },
});
