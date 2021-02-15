import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Box, Text } from '../..';
import { buttonColors } from '../ButtonColors';

type HeaderButtonProps = {
  color: 'blue' | 'green' | 'grey' | 'white' | 'red' | 'primaryRed';
  onPress?: () => void;
  text?: string;
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
};

function HeaderButton({ color, text, onPress, loading, disabled = false, style }: HeaderButtonProps) {
  const { textColor, initialColor } = buttonColors[color];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={disabled ? undefined : onPress}>
      <Box style={[{ backgroundColor: disabled ? 'grey' : initialColor }, styles.button, style]} marginBottom="s">
        {loading ? (
          <ActivityIndicator color={textColor || 'white'} />
        ) : (
          <Text variant="text" fontSize={18} color="primaryText" fontWeight="600">
            {text}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
}

export default React.memo(HeaderButton);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});
