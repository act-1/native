import React from 'react';
import { Box } from '../';
import Icon from 'react-native-vector-icons/Feather';

type CircularButtonProps = {
  iconName: string;
  color: string;
  text?: string;
};

function CircularButton({ iconName, color, text }: CircularButtonProps) {
  return (
    <Box
      width={45}
      height={45}
      borderRadius={50}
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: color }}
    >
      <Icon name={iconName} size={25} color="white" />
    </Box>
  );
}

export default CircularButton;
