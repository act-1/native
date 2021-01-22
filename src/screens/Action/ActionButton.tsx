import React from 'react';
import { Alert, Image, ImageBackground, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { Box, Text } from '../../components';
import TouchableScale from 'react-native-touchable-scale';
import HapticFeedback from 'react-native-haptic-feedback';
import { buttonColors } from '@components/Buttons/ButtonColors';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

type ActionButtonProps = {
  backgroundImage: ImageSourcePropType;
  icon: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
  color: string;
  style?: ViewStyle;
};

export default function ActionButton({ backgroundImage, icon, title, description, onPress, color, style }: ActionButtonProps) {
  const { initialColor } = buttonColors[color];

  return (
    <TouchableScale
      onPress={onPress}
      activeScale={0.98}
      friction={6}
      onPressOut={() => HapticFeedback.trigger('impactLight')}
      style={style}
    >
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Image source={icon} style={{ width: 60, height: 60, marginBottom: 8 }} />
          <Text variant="largeTitle" marginBottom="xs" style={{ color: initialColor }}>
            {title}
          </Text>
          <Text variant="smallText" style={{ color: initialColor }}>
            {description}
          </Text>
        </Box>
      </ImageBackground>
    </TouchableScale>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 156,
  },
});
