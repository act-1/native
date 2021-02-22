import React from 'react';
import { CircularButton } from '../../components';

type SendProps = {
  onSend: () => void;
  disabled?: boolean;
};

function Send({ onSend, disabled }: SendProps) {
  return <CircularButton size="small" iconName="arrow-left" color="blue" onPress={onSend} disabled={disabled} />;
}

export default Send;
