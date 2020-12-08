import React from 'react';
import { Box, Text } from '../../components';
import Icon from 'react-native-vector-icons/Feather';

type EventPageDetailProps = {
  iconName: string;
  text: string;
};

function EventPageDetail({ iconName, text }: EventPageDetailProps) {
  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name={iconName} size={16} color="#000" style={{ marginRight: 8 }} />
      <Text variant="text">{text}</Text>
    </Box>
  );
}

export default EventPageDetail;
