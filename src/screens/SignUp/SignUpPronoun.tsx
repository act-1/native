import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box, Text, CircularOption } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { updateUserPronoun } from '@services/user';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';

const heIcon = Platform.select({ ios: '👦', android: '🧑‍' });
const sheIcon = Platform.select({ ios: '👧', android: '👩‍' });
const nonBinaryIcon = Platform.select({ ios: '🧒', android: '👦' });

function SignUpPronoun({ navigation }) {
  const { userStore } = useStore();

  const onPronounPress = (pronoun: Pronoun) => {
    userStore.updateSignUpData({ pronoun });
    HapticFeedback.trigger('impactLight');
  };

  const nextStep = () => {
    userStore.updateSignUpData(userStore.signUpData.pronoun);
    navigation.navigate('SignUpRegion');
  };

  return (
    <Box flex={1} paddingHorizontal="l">
      <Text
        variant="hugeTitle"
        color="primaryColor"
        fontSize={68}
        textAlign="center"
        maxFontSizeMultiplier={1.2}
        style={{ marginBottom: Platform.select({ ios: 32, android: 8 }) }}
      >
        ACT1
      </Text>
      <Text variant="extraLargeTitle" maxFontSizeMultiplier={1.1}>
        את/ה מפגין/ה?
      </Text>
      <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Light" marginBottom="xl" maxFontSizeMultiplier={1.1}>
        בשביל שנדע איך לפנות אליך :)
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
        <RoundedButton color="yellow" text="המשך" onPress={() => nextStep()} />
      </Box>
    </Box>
  );
}

export default observer(SignUpPronoun);

const styles = StyleSheet.create({});
