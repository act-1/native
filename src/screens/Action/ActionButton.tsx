import React from 'react';
import { Box, Text } from '../../components';
import TouchableScale from 'react-native-touchable-scale';

export default function ActionButton() {
  return (
    <TouchableScale activeScale={0.98}>
      <Box backgroundColor="eventBoxDateColor" height={156}>
        <Text variant="text">Hi</Text>
      </Box>
    </TouchableScale>
  );
}
