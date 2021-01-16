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
        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="m">
          ברוכות הבאות לאפליקציית האקטיביזם של ישראל.
        </Text>

        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="m" style={{ writingDirection: 'rtl' }}>
          ACT1 הוא כלי הישרת אותנו, הגיבורים.ות במאבקים בהם אנחנו מאמינים.
        </Text>

        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="m" color="yellow">
          אנחנו מאמינות ומאמינים בעולם שיוויני וצודק, בו נחיה בשלום וערבות הדדית אחד עם השניה.
        </Text>

        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="xs">
          בשביל זה נצא ונפגין.
        </Text>
        <Text variant="largeTitle" textAlign="center" color="lightText" style={{ marginBottom: 28 }}>
          כי ככה זה מתחיל.
        </Text>

        <RoundedButton text="המשך" color="yellow" onPress={nextPage} />
      </Box>
    </Box>
  );
}

export default Welcome;
