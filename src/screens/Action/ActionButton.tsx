import React from 'react';
import { Alert, Image, ImageBackground, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import TouchableScale from 'react-native-touchable-scale';
import HapticFeedback from 'react-native-haptic-feedback';
import { buttonColors } from '@components/Buttons/ButtonColors';
import ImagePicker from 'react-native-image-crop-picker';

export default function ActionButton({ backgroundImage, icon, title, description, color, style }) {
  const { initialColor } = buttonColors[color];

  const openCamera = async () => {
    try {
      await ImagePicker.openPicker({});
    } catch (err) {
      if (err.code === 'E_PERMISSION_MISSING') {
        console.log(err.code);
        Alert.alert(err.code);
      }
    }
    // ImagePicker.openCamera({ cropping: false }).then((res) => console.log(res));
  };

  return (
    <TouchableScale
      onPress={openCamera}
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
