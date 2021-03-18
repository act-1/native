import React, { useState, useEffect, useRef } from 'react';
import { Platform, Image, StyleSheet } from 'react-native';
import { Box, Text, CircularOption } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import HapticFeedback from 'react-native-haptic-feedback';
import RoundedButton from '@components/Buttons/RoundedButton';
import Ivrita from 'ivrita';

const icons = {
  anarchist: { MALE: '🦹‍♂️', FEMALE: '🦹‍♀️', NEUTRAL: '🦹', ORIGINAL: '🦹' },
  distributor: { MALE: '🧚‍♂️', FEMALE: '🧚‍♀️', NEUTRAL: '🧚‍♂️', ORIGINAL: '🧚' },
};

function SignUpAvatar({ navigation }) {
  const { userStore } = useStore();
  const { pronoun } = userStore.signUpData;

  const onAvatarPress = (avatar: Avatar) => {
    HapticFeedback.trigger('impactLight');
    userStore.updateSignUpData({ avatar });
  };

  const skipStep = () => {
    userStore.updateSignUpData({ avatar: null });
    navigation.navigate('SignUpCompleted');
  };

  const questionPronoun = Ivrita.genderize('איזה סוג של מפגינ.ה את.ה?', Ivrita[pronoun]);

  return (
    <Box flex={1}>
      <Text variant="extraLargeTitle" fontSize={18} opacity={0.85}>
        שאלה אחרונה:
      </Text>
      <Text variant="extraLargeTitle">{questionPronoun}</Text>
      <Text variant="boxTitle" fontFamily="AtlasDL3.1AAA-Light" marginBottom="xl">
        סקר עומק במימון המכון להסתה
      </Text>
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xm">
        <CircularOption
          content={'👽'}
          caption={Ivrita.genderize('חייזר.ית', Ivrita[pronoun])}
          selected={userStore.signUpData.avatar === 'alien'}
          onPress={() => onAvatarPress('alien')}
        />
        <CircularOption
          content={icons.anarchist[pronoun]}
          caption={Ivrita.genderize('אנרכיסט.ית', Ivrita[pronoun])}
          selected={userStore.signUpData.avatar === 'anarchist'}
          onPress={() => onAvatarPress('anarchist')}
        />
      </Box>
      <Box flexDirection="row" justifyContent="space-evenly" marginBottom="xl">
        <CircularOption
          content={icons.distributor[pronoun]}
          caption={Ivrita.genderize('מפיצ.ת מחלות', Ivrita[pronoun])}
          selected={userStore.signUpData.avatar === 'diseaseDistributor'}
          onPress={() => onAvatarPress('diseaseDistributor')}
        />
        <CircularOption
          content={
            <Image
              source={
                userStore.signUpData.avatar === 'traitor'
                  ? require('@assets/illustrations/boged-selected.png')
                  : require('@assets/illustrations/boged.png')
              }
            />
          }
          caption={Ivrita.genderize('בוגד.ת', Ivrita[pronoun])}
          onPress={() => onAvatarPress('traitor')}
        />
      </Box>
      <Box alignItems="center" marginBottom="m">
        <RoundedButton color="yellow" text="המשך" onPress={() => navigation.navigate('SignUpCompleted')} />
      </Box>
      <Box alignItems="center" opacity={0.55}>
        <RoundedButton color="grey" text="דילוג" onPress={skipStep} />
      </Box>
    </Box>
  );
}

export default observer(SignUpAvatar);

const styles = StyleSheet.create({});
