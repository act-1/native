import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../';
import Icon from 'react-native-vector-icons/Feather';

type CircularButtonProps = {
  iconName: string;
  color: 'blue' | 'green' | 'grey' | 'white';
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large';
};

type ButtonColors = {
  initialColor: string;
  pressedColor: string;
  iconColor?: string;
};

type ColorsDict = {
  [index: string]: ButtonColors;
};

const buttonColors: ColorsDict = {
  blue: {
    initialColor: '#3498ff',
    pressedColor: '#57abff',
  },
  green: {
    initialColor: '#08c236',
    pressedColor: '#1ad348',
  },
  grey: {
    initialColor: '#696a6c',
    pressedColor: '#88898b',
  },
  white: {
    initialColor: '#d4d4d4',
    pressedColor: '#88898b',
    iconColor: '#000',
  },
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

function CircularButton({ iconName, color, text, onPress, size = 'large' }: CircularButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor, iconColor } = buttonColors[color];
  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box justifyContent="center" alignItems="center" testID="button-container">
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{ backgroundColor: pressed ? pressedColor : initialColor, ...buttonDimensions, ...styles.button }}
        testID="button-pressable"
      >
        <Icon name={iconName} size={25} color={iconColor ? iconColor : 'white'} />
      </Pressable>
      <Text style={{ color: pressed ? pressedColor : initialColor }} variant="buttonText" testID="button-text">
        {text}
      </Text>
    </Box>
  );
}

export default React.memo(CircularButton);

const styles = StyleSheet.create({
  button: {
    marginBottom: 6,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
