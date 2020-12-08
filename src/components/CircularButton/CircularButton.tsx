import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../';
import Icon from 'react-native-vector-icons/Feather';

type CircularButtonProps = {
  iconName: string;
  color: 'blue' | 'green' | 'grey';
  text?: string;
};

type ButtonColors = {
  initialColor: string;
  pressedColor: string;
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
};

function CircularButton({ iconName, color, text }: CircularButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor } = buttonColors[color];

  return (
    <Box justifyContent="center" alignItems="center" testID="button-container">
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{ backgroundColor: pressed ? pressedColor : initialColor, ...styles.button }}
        testID="button-pressable"
      >
        <Icon name={iconName} size={25} color="white" />
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
    width: 45,
    height: 45,
    marginBottom: 6,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
