import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Box, Text, RoundedButton } from '../..';
import { View as MotiView } from 'moti';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import OnboardingMap from './OnboardingMap';

const humanDoodle = require('@assets/illustrations/human-being.png');
const badDoodle = require('@assets/illustrations/bad-guys.png');
const goodDoodle = require('@assets/illustrations/peace-weapons.png');

function OnboardingProtestMode({ nextPage, finishOnboarding }: { nextPage: () => void; finishOnboarding: () => void }) {
  const { userStore } = useStore();

  let topContent = <ProtestModeDoodles />;
  let nextButton = (
    <RoundedButton
      color="yellow"
      text="המשך"
      onPress={() => {
        nextPage();
      }}
    />
  );

  if (userStore.userLocationPermission !== 'denied') {
    topContent = <OnboardingMap />;
    nextButton = (
      <RoundedButton
        color="yellow"
        text="סיום"
        onPress={() => {
          finishOnboarding();
        }}
      />
    );
  }

  return (
    <Box flex={1} style={{ alignItems: 'center' }}>
      {topContent}

      <Text
        variant="largeTitle"
        fontSize={22}
        color="primaryColor"
        marginBottom="s"
        textAlign="center"
        maxFontSizeMultiplier={1.15}
      >
        מצב הפגנה
      </Text>
      <Box paddingHorizontal="l">
        <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
          מצב הפגנה יופעל אוטומטית כשתגיעו לאיזור בו מתקיימת הפגנה.
        </Text>
        <Text variant="text" marginBottom="l" textAlign="center" maxFontSizeMultiplier={1.15}>
          שלחו וקבלו דיווחים, העלו תמונות והגדילו את מספר המפגינים.
        </Text>
      </Box>
      {nextButton}
    </Box>
  );
}

export default observer(OnboardingProtestMode);

const ProtestModeDoodles = () => (
  <Box flexDirection="row" marginBottom="m" alignItems="center" paddingTop="xm" paddingHorizontal="l">
    <MotiView
      from={{ translateY: 0 }}
      animate={{ translateY: 10 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 2000,
        delay: 0,
      }}
    >
      <Image
        source={badDoodle}
        style={{ width: 65, height: 75, opacity: 0.85, transform: [{ translateY: -30 }, { translateX: 10 }] }}
      />
    </MotiView>
    <Image source={humanDoodle} style={{ width: 110, height: 125 }} />

    <MotiView
      from={{ translateY: 15 }}
      animate={{ translateY: 0 }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 2000,
        delay: 0,
      }}
    >
      <Image source={goodDoodle} style={{ width: 75, height: 69, opacity: 0.85, transform: [{ translateX: -3 }] }} />
    </MotiView>
  </Box>
);
