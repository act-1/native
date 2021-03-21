// Inspired by https://github.com/cuvent/react-native-vision-camera/blob/main/example/src/views/StatusBarBlurBackground.tsx

import React from 'react';
import { BlurView, BlurViewProperties } from '@react-native-community/blur';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FALLBACK_COLOR = 'rgba(140, 140, 140, 0.3)';

const StatusBarBlurBackground = ({ style, ...props }: BlurViewProperties): React.ReactElement | null => {
  const insets = useSafeAreaInsets();
  if (Platform.OS !== 'ios') return null;

  return (
    <BlurView
      style={[styles.statusBarBackground, { height: insets.top }, style]}
      blurType="light"
      reducedTransparencyFallbackColor={FALLBACK_COLOR}
      {...props}
    />
  );
};

export default React.memo(StatusBarBlurBackground);

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
