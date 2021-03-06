import { backgroundColor } from '@shopify/restyle';
import React, { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';

type CircularOptionProps = {
  content: string;
  caption?: string;
  onPress?: () => void;
};

function CircularOption({ content, caption, selected, onPress }: CircularOptionProps) {
  return (
    <Box>
      <Pressable
        style={[styles.optionWrapper, { backgroundColor: selected ? '#ff9c97' : 'white' }]}
        onPress={onPress}
        android_ripple={{ color: '#ff9c97', radius: 50 }}
      >
        <Text fontSize={58}>{content}</Text>
      </Pressable>
      {caption && (
        <Text variant="text" textAlign="center">
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
  },
});
