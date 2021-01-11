import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle, Image, ImageSourcePropType } from 'react-native';
import { Box, Text } from '../..';
import { buttonColors } from '../ButtonColors';

type RoundedButtonProps = {
  color?: 'blue' | 'darkBlue' | 'green' | 'yellow' | 'grey' | 'porcelain' | 'white' | 'black';
  icon?: ImageSourcePropType;
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large' | 'huge';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

function getButtonDimenions(size: string): ViewStyle {
  if (size === 'small') {
    return {
      width: 155,
      height: 30,
    };
  }

  if (size === 'huge') {
    return {
      width: '100%',
      height: 130,
    };
  }

  return {
    width: 250,
    height: 45,
  };
}

function RoundedButton({ color = 'porcelain', icon, text, onPress, size = 'large', style, textStyle }: RoundedButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor, textColor } = buttonColors[color];
  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      testID="button-container"
      width={buttonDimensions.width}
      height={buttonDimensions.height}
      style={style}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{ backgroundColor: pressed ? pressedColor : initialColor, ...buttonDimensions, ...styles.button }}
      >
        {icon && <Image source={icon} style={{ marginBottom: 12 }} />}
        <Text style={{ color: textColor, ...textStyle }} variant="roundedButtonText" testID="button-text">
          {text}
        </Text>
      </Pressable>
    </Box>
  );
}

export default React.memo(RoundedButton);

const styles = StyleSheet.create({
  button: {
    marginBottom: 6,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
