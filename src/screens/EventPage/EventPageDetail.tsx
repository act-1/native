import React, { useState } from 'react';
import { getFontScale } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text } from '../../components';

type EventPageDetailProps = {
  iconName: string;
  text: string;
};

function EventPageDetail({ iconName, text }: EventPageDetailProps) {
  const [fontScale, setFontScale] = useState(1);
  getFontScale().then((scale) => setFontScale(scale));
  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name={iconName} size={16 * fontScale} color="#000" style={{ marginRight: 8 * fontScale }} />
      <Text variant="text">{text}</Text>
    </Box>
  );
}

export default React.memo(EventPageDetail);
