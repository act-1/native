import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Welcome({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1} style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <SafeAreaView />

      <Box flex={1} justifyContent="flex-start" alignItems="center" marginTop="xm" paddingHorizontal="xm">
        <Text variant="hugeTitle" fontSize={56} fontWeight="900" color="headerTitle" marginTop="xxl" marginBottom="xm">
          ACT1
        </Text>

        <RoundedButton text="המשך" color="yellow" onPress={nextPage} />
      </Box>
    </Box>
  );
}

export default Welcome;
