/* eslint-disable  @typescript-eslint/no-explicit-any */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme';
import { Box, Text } from '../';

type Variant = 'default' | 'attention';

type ButtonProps = {
  title?: string;
  icon?: Icon | string;
  variant: Variant;
  style?: object;
  onPress?: () => void;
};

function getPressableStyle(variantName: Variant, pressed: boolean): ViewStyle {
  if (variantName === 'attention') {
    return { backgroundColor: pressed ? '#fdb65f' : '#ffc075' };
  }
  return { backgroundColor: pressed ? '#e2e2e2' : 'transparent', borderWidth: 1 };
}

function textStyle(variantName: Variant): TextStyle {
  const theme = useTheme<Theme>();

  if (variantName === 'attention') {
    return { color: theme.colors.attentionForeground };
  }
  return { color: theme.colors.primaryText };
}

function Button({ title, variant, style, icon, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [getPressableStyle(variant, pressed), { ...styles.button, ...style }]}
      onPress={onPress}
    >
      <Box flexDirection="row" justifyContent="center" alignItems="center" height={50} padding="m">
        {icon}
        <Text variant="buttonText" style={textStyle(variant)}>
          {title}
        </Text>
      </Box>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    flex: 1,
  },
});
