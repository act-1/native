import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Welcome({ nextPage }: BoardingScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1}>
      <SafeAreaView />

      <Box flex={1} justifyContent="flex-start" alignItems="center" style={{ paddingHorizontal: 36, marginTop: 54 + insets.top }}>
        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="m" style={{ writingDirection: 'rtl' }}>
          ברוכות הבאות לאפליקציית האקטיביזם של ישראל
        </Text>
        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="xm" style={{ writingDirection: 'rtl' }}>
          ACT1 היא כלי הישרת אותנו במאבקים בהם אנחנו מאמינים
        </Text>

        <Text variant="largeTitle" textAlign="center" marginBottom="xm" color="yellow">
          אנחנו מאמינות ומאמינים בעולם שיוויוני וצודק, בו נחיה בשלום וערבות הדדית
        </Text>

        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="xs">
          בגלל זה נצא ונפגין
        </Text>
        <Text variant="largeTitle" textAlign="center" color="lightText" style={{ marginBottom: 24 }}>
          כי ככה זה מתחיל
        </Text>

        <RoundedButton text="המשך" color="yellow" onPress={nextPage} />
      </Box>
    </Box>
  );
}

export default Welcome;
