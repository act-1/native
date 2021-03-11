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

  const marginBottom = fontScale > 1 ? fontScale * 2.75 : 0;

  return (
    <Box flexDirection="row" alignItems="center" style={{ marginBottom }}>
      <Icon name={iconName} size={16 * fontScale} color="#50c9cd" style={{ marginRight: 8 * fontScale }} />
      <Text variant="text">{text}</Text>
    </Box>
  );
}

export default React.memo(EventPageDetail);
