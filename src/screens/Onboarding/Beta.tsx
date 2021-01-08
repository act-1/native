import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import RoundedButton from '@components/Buttons/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../../stores';

function Beta() {
  const store = useStore();

  const closeOnBoardingModal = () => {
    analytics().logEvent('beta_modal_closed');
    AsyncStorage.setItem('seenBetaModal', 'true');
    store.updateOnboardingSeenState('true');
  };

  useEffect(() => {
    analytics().logEvent('beta_modal_shown');
  }, []);

  return (
    <Box flex={1} backgroundColor="onBoardingBackground">
      <StatusBar backgroundColor="#6E7DFF" barStyle="light-content" />
      <SafeAreaView />
      <Box flex={1} paddingHorizontal="m" marginTop="xxl">
        <Text variant="hugeTitle" color="mainBackground" textAlign="center" paddingHorizontal="xm" marginBottom="xm">
          ברוכות וברוכים הבאים אל Act1
        </Text>
        <Text
          variant="largeTitle"
          color="mainBackground"
          textAlign="center"
          paddingHorizontal="xm"
          marginBottom="m"
          style={{ direction: 'rtl' }}
        >
          זוהי גרסת הנסיון הראשונית של Act1, אפליקציה שתקדם את המחאה בישראל.
        </Text>
        <Text variant="largeTitle" color="mainBackground" textAlign="center" paddingHorizontal="xxl">
          נשמח לפידבק שלכם בקבוצת הפייסבוק שלנו.
        </Text>

        <Box alignItems="center" marginTop="xl">
          <RoundedButton text="בואו נתחיל" color="yellow" onPress={() => closeOnBoardingModal()} />
        </Box>
      </Box>
    </Box>
  );
}

export default Beta;
