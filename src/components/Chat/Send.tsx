import React from 'react';
import { Box, CircularButton } from '../../components';

type SendProps = {
  onSend: () => void;
  disabled?: boolean;
};

function Send({ onSend, disabled }: SendProps) {
  return (
    <Box>
      <CircularButton size="small" iconName="arrow-left" color="blue" onPress={onSend} disabled={disabled} />
    </Box>
  );
}

export default Send;
