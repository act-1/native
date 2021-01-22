import React from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';

function Welcome({ nextPage }: BoardingScreenProps) {
  return (
    <Box flex={1}>
      <SafeAreaView />

      <Box flex={1} justifyContent="flex-start" alignItems="center" style={{ paddingHorizontal: 36 }}>
        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="m" style={{ writingDirection: 'rtl' }}>
          מערכה ראשונה היא החלק הראשון שיוצר הכרות עם הגיבור.ה, היוצא.ת להתעמת עם האירוע המסית
        </Text>
        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="xm" style={{ writingDirection: 'rtl' }}>
          אנו רואים את ACT1 ככלי המשרת אותנו, הגיבורים.ות במאבקים הקרובים לליבנו, בהם אנחנו מאמינים
        </Text>

        <Text variant="largeTitle" textAlign="center" marginBottom="xm" color="yellow">
          אנחנו מאמינות ומאמינים בעולם שיוויני וצודק, בו נחיה בשלום וערבות הדדית אחד עם השניה
        </Text>

        <Text variant="largeTitle" textAlign="center" color="lightText" marginBottom="xs" style={{ marginHorizontal: -12 }}>
          כל שינוי מתחיל במערכה ראשונה
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
