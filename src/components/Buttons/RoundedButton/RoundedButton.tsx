import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Box, Text } from '../..';
import { buttonColors } from '../ButtonColors';

type RoundedButtonProps = {
  color: 'blue' | 'green' | 'yellow' | 'grey' | 'porcelain' | 'white' | 'black';
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

function getButtonDimenions(size: string): ViewStyle {
  if (size === 'small') {
    return {
      width: 150,
      height: 35,
    };
  }

  return {
    width: 250,
    height: 45,
  };
}

function RoundedButton({ color, text, onPress, size = 'large', style, textStyle }: RoundedButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor, textColor } = buttonColors[color];
  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      testID="button-container"
      width={buttonDimensions.width}
      style={style}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{ backgroundColor: pressed ? pressedColor : initialColor, ...buttonDimensions, ...styles.button }}
      >
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
