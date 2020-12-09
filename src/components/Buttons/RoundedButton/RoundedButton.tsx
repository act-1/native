import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../..';
import { buttonColors } from '../ButtonColors';

type RoundedButtonProps = {
  color: 'blue' | 'green' | 'yellow' | 'grey' | 'porcelain' | 'white';
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large';
};

function getButtonDimenions(size: string): ViewStyle {
  if (size === 'small') {
    return {
      width: 35,
      height: 35,
    };
  }

  return {
    width: 45,
    height: 45,
  };
}

function RoundedButton({ color, text, onPress, size = 'large' }: RoundedButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor, textColor } = buttonColors[color];
  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box justifyContent="center" alignItems="center" testID="button-container">
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{ backgroundColor: pressed ? pressedColor : initialColor, ...buttonDimensions, ...styles.button }}
      >
        <Text style={{ color: textColor }} variant="roundedButtonText" testID="button-text">
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
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
