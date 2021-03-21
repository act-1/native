import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import RoundedButton from '@components/Buttons/RoundedButton';

function SignUpHello({ navigation }) {
  return (
    <Box flex={1} paddingHorizontal="l">
      <Text
        variant="hugeTitle"
        color="primaryColor"
        fontSize={68}
        textAlign="center"
        marginBottom="l"
        maxFontSizeMultiplier={1.2}
      >
        ACT1
      </Text>
      <Text variant="hugeTitle" marginBottom="xm" maxFontSizeMultiplier={1.05}>
        היי! 👋
      </Text>
      <Text variant="largeTitle" marginBottom="l" maxFontSizeMultiplier={1.05}>
        השימוש ב- ACT1 הוא אנונימי לחלוטין.
      </Text>
      <Text variant="largeTitle" marginBottom="l" maxFontSizeMultiplier={1.05}>
        בשביל שנוכל להתאים את האפליקציה עבורכן.ם, יש לנו כמה שאלות.
      </Text>
      <Text variant="largeTitle" marginBottom="xl" maxFontSizeMultiplier={1.05}>
        אין חובה לענות על שום שאלה.
      </Text>

      <Box alignItems="center">
        <RoundedButton color="yellow" text="המשך" onPress={() => navigation.navigate('SignUpPronoun')} />
      </Box>
    </Box>
  );
}

export default SignUpHello;
