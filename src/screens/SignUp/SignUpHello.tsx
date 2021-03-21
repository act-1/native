import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import RoundedButton from '@components/Buttons/RoundedButton';

function SignUpHello({ navigation }) {
  return (
    <Box flex={1}>
      <Text variant="hugeTitle" color="primaryColor" fontSize={68} textAlign="center" marginBottom="xxl">
        ACT1
      </Text>
      <Text variant="hugeTitle" marginBottom="xm">
        היי! 👋
      </Text>
      <Text variant="largeTitle" marginBottom="m">
        השימוש ב- ACT1 הוא אנונימי לחלוטין.
      </Text>
      <Text variant="largeTitle" marginBottom="m">
        בשביל שנוכל להתאים את האפליקציה עבורכן.ם, יש לנו כמה שאלות.
      </Text>
      <Text variant="largeTitle" marginBottom="xl">
        אין חובה לענות על שום שאלה.
      </Text>

      <Box alignItems="center">
        <RoundedButton color="yellow" text="המשך" onPress={() => navigation.navigate('SignUpPronoun')} />
      </Box>
    </Box>
  );
}

export default SignUpHello;
