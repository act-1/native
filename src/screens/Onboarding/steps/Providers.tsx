import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { facebookLogin } from '@services/auth';

function Providers({ nextPage }: BoardingScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const facebookSignUp = async () => {
    try {
      setIsLoading(true);
      const result = await facebookLogin();
      console.log(result);
      if (result.isNewUser) {
        setIsLoading(false);
        nextPage();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      // Send to crashlytics
    }
  };

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

        <RoundedButton text="התחברות דרך פייסבוק" color="darkBlue" onPress={facebookSignUp} style={{ marginBottom: 16 }} />
        <RoundedButton text="התחברות דרך גוגל" color="darkBlue" onPress={facebookSignUp} />
      </Box>
    </Box>
  );
}

export default Providers;
