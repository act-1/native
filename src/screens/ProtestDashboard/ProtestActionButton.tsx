import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ImageURISource } from 'react-native';
import { Box, Text } from '../../components';

type ProtestActionButtonProps = {
  title: string;
  icon: ImageURISource;
  onPress: () => void;
};

function ProtestActionButton({ title, icon, onPress }: ProtestActionButtonProps) {
  return (
    <Box alignItems="center">
      <TouchableOpacity style={styles.protestActionIconWrapper} activeOpacity={0.8} onPress={onPress}>
        <Image source={icon} style={styles.protestActionIcon} />
      </TouchableOpacity>
      <Text variant="boxTitle">{title}</Text>
    </Box>
  );
}

export default ProtestActionButton;

const styles = StyleSheet.create({
  protestActionIconWrapper: {
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 50,
    backgroundColor: '#111111',
  },
  protestActionIcon: {
    width: 50,
    height: 50,
  },
});
