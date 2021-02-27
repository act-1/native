import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '../../components';

type ProtestActionButtonProps = {
  title: string;
};

function ProtestActionButton({ title }: ProtestActionButtonProps) {
  return (
    <Box alignItems="center">
      <TouchableOpacity style={styles.protestActionIcon} activeOpacity={0.8}>
        <Image source={require('@assets/icons/chat-icon.png')} />
      </TouchableOpacity>
      <Text variant="boxTitle">{title}</Text>
    </Box>
  );
}

export default ProtestActionButton;

const styles = StyleSheet.create({
  protestActionIcon: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 50,
    backgroundColor: '#111111',
  },
});
