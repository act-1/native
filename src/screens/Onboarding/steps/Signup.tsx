import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Signup() {
  return (
    <Box flex={1} style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <SafeAreaView />

      <Box flex={1} justifyContent="flex-start" alignItems="center" marginTop="xm" paddingHorizontal="xm">
        <Text variant="hugeTitle" fontSize={56} fontWeight="900" color="headerTitle" marginTop="xxl" marginBottom="xm">
          ACT1
        </Text>
        <Text variant="largeTitle" fontSize={24} marginBottom="xl">
          מתחברים למהפכה.
        </Text>

        <RoundedButton text="התחברות דרך פייסבוק" color="darkBlue" />
      </Box>
    </Box>
  );
}

export default Signup;
