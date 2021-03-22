import React, { ReactElement } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../';

type CircularOptionProps = {
  content: string | ReactElement;
  caption?: string;
  selected?: boolean;
  onPress?: () => void;
};

function CircularOption({ content, caption, selected, onPress }: CircularOptionProps) {
  return (
    <Box alignItems="center">
      <Pressable
        style={[styles.optionWrapper, { borderColor: selected ? '#ff7a7a' : '#333333' }]}
        onPress={onPress}
        android_ripple={{ color: '#FF5858', radius: 50 }}
      >
        {typeof content === 'string' ? (
          <Text fontSize={58} allowFontScaling={false}>
            {content}
          </Text>
        ) : (
          content
        )}
      </Pressable>
      {caption && (
        <Text variant="text" textAlign="center" maxFontSizeMultiplier={1.05}>
          {caption}
        </Text>
      )}
    </Box>
  );
}

export default CircularOption;

const styles = StyleSheet.create({
  optionWrapper: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 50,
    borderWidth: 4,
    backgroundColor: '#333333',
  },
});
