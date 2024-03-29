import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '../..';
import { RoundedButton } from '../../Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { requestLocationPermission } from '@utils/location-utils';
import OnboardingMap from './OnboardingMap';
import Ivrita from 'ivrita';

function OnboardingPermission({ finishOnboarding }: { finishOnboarding: () => void }) {
  const { userStore } = useStore();

  const { pronoun } = userStore.userData;

  const requestLocation = async () => {
    try {
      await requestLocationPermission();
      userStore.initUserLocation();
      setTimeout(() => {
        finishOnboarding();
      }, 300);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Box flex={1}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <OnboardingMap />

        <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
          מצב הפגנה
        </Text>

        <Box paddingHorizontal="m">
          <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
            {Ivrita.genderize('על מנת להכנס למצב הפגנה יש להפעיל את שירותי המיקום של מכשירכם.ן.', Ivrita[pronoun])}
          </Text>
          <Text variant="text" marginBottom="l" textAlign="center" maxFontSizeMultiplier={1.15}>
            {Ivrita.genderize('המיקום נשאר על גבי מכשירכם.ן בלבד ולא עובר אלינו.', Ivrita[pronoun])}
          </Text>
        </Box>
        <RoundedButton text="הפעלת שירותי מיקום" onPress={() => requestLocation()} color="yellow" style={{ marginBottom: 8 }} />
        <RoundedButton style={{ opacity: 0.5 }} color="grey" text="לא עכשיו" onPress={() => finishOnboarding()} />
      </ScrollView>
    </Box>
  );
}

export default observer(OnboardingPermission);
