import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Box, Text } from '../..';
import Icon from 'react-native-vector-icons/Feather';
import { buttonColors } from '../ButtonColors';

type CircularButtonProps = {
  iconName: string;
  iconSize?: number;
  color: 'blue' | 'darkBlue' | 'green' | 'red' | 'orange' | 'grey' | 'porcelain' | 'white' | 'black' | 'turquoise';
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large';
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  transparent?: boolean;
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

function CircularButton({
  iconName,
  iconSize = 25,
  color,
  text,
  onPress,
  size = 'large',
  loading,
  disabled = false,
  transparent = false,
  style,
}: CircularButtonProps) {
  const [pressed, setPressed] = useState(false);
  let { initialColor, pressedColor, iconColor } = buttonColors[disabled ? 'grey' : color];

  if (transparent) {
    iconColor = initialColor;
    initialColor = 'transparent';
    pressedColor = 'transparent';
  }

  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box justifyContent="center" alignItems="center" testID="button-container">
      <Pressable
        onPress={disabled ? null : onPress}
        onPressIn={disabled ? null : () => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          backgroundColor: pressed ? pressedColor : initialColor,
          opacity: pressed ? 0.875 : 1,
          ...buttonDimensions,
          ...styles.button,
          ...style,
        }}
      >
        {loading ? (
          <ActivityIndicator color={iconColor ? iconColor : 'white'} />
        ) : (
          <Icon name={iconName} size={iconSize} color={iconColor ? iconColor : 'white'} />
        )}
      </Pressable>
      {text && (
        <Text style={{ color: pressed ? pressedColor : initialColor }} marginTop="s" variant="circularButtonText">
          {text}
        </Text>
      )}
    </Box>
  );
}

export default React.memo(CircularButton);

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
