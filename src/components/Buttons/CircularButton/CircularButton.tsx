import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Box, Text } from '../..';
import Icon from 'react-native-vector-icons/Feather';
import { buttonColors } from '../ButtonColors';

type CircularButtonProps = {
  iconName: string;
  color: 'blue' | 'green' | 'grey' | 'white';
  onPress?: () => void;
  text?: string;
  size?: 'small' | 'large';
  loading: boolean;
  style?: ViewStyle;
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

function CircularButton({ iconName, color, text, onPress, size = 'large', loading, style }: CircularButtonProps) {
  const [pressed, setPressed] = useState(false);
  const { initialColor, pressedColor, iconColor } = buttonColors[color];
  const buttonDimensions = getButtonDimenions(size);

  return (
    <Box justifyContent="center" alignItems="center" testID="button-container" flex={1}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          backgroundColor: pressed ? pressedColor : initialColor,
          ...buttonDimensions,
          ...styles.button,
          ...style,
        }}
        testID="button-pressable"
      >
        {loading ? (
          <ActivityIndicator color={iconColor ? iconColor : 'white'} />
        ) : (
          <Icon name={iconName} size={25} color={iconColor ? iconColor : 'white'} />
        )}
      </Pressable>
      {text && (
        <Text
          style={{ color: pressed ? pressedColor : initialColor }}
          marginTop="s"
          variant="circularButtonText"
          testID="button-text"
        >
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
