import React, { useState, useEffect, useRef } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';
import CircularOption from './CircularOption';

const heIcon = Platform.select({ ios: '👦', android: '🧑‍' });
const sheIcon = Platform.select({ ios: '👧', android: '👩‍' });
const nonBinaryIcon = Platform.select({ ios: '🧒', android: '👦' });

function SignUpProvince({ navigation }) {
  const { userStore } = useStore();

  const onPronounPress = (pronoun: Pronoun) => {
    HapticFeedback.trigger('impactLight');
    userStore.updateSignUpData({ pronoun });
  };

  return (
    <Box flex={1}>
      <Text variant="extraLargeTitle">את/ה מפגין/ה?</Text>
      <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Light" marginBottom="xl">
        זה בשביל שנדע איך לפנות אליך :)
      </Text>
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xm">
        <CircularOption
          content={heIcon!}
          caption="מפגין"
          selected={userStore.signUpData.pronoun === 'MALE'}
          onPress={() => onPronounPress('MALE')}
        />
        <CircularOption
          content={sheIcon!}
          caption="מפגינה"
          selected={userStore.signUpData.pronoun === 'FEMALE'}
          onPress={() => onPronounPress('FEMALE')}
        />
      </Box>
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xl">
        <CircularOption
          content={nonBinaryIcon!}
          caption="מפגינ/ה"
          selected={userStore.signUpData.pronoun === 'NEUTRAL'}
          onPress={() => onPronounPress('NEUTRAL')}
        />
        <CircularOption
          content="👀"
          caption={`מעדיפ/ה ${'\n'}לא להגיד`}
          selected={userStore.signUpData.pronoun === 'ORIGINAL'}
          onPress={() => onPronounPress('ORIGINAL')}
        />
      </Box>
      <Box alignItems="center">
        <RoundedButton color="yellow" text="המשך" onPress={() => navigation.goBack()} />
      </Box>
    </Box>
  );
}

export default observer(SignUpProvince);

const styles = StyleSheet.create({});
