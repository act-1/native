import React from 'react';
import { Box, CircularButton } from '../../components';

type CameraProps = {
  onPress: () => void;
};

function Camera({ onPress }: CameraProps) {
  return (
    <Box>
      <CircularButton size="small" iconName="camera" iconSize={26} color="blue" onPress={onPress} transparent />
    </Box>
  );
}

export default Camera;
