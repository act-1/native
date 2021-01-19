import React from 'react';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Features({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" marginTop="xm" paddingHorizontal="xm">
      <Text>Hi</Text>

      <RoundedButton text="המשך" color="yellow" onPress={nextPage} />
    </Box>
  );
}

export default Features;
