import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import ViewPager from '@react-native-community/viewpager';
import RoundedButton from '@components/Buttons/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../../stores';

// const closeOnBoardingModal = () => {
//   analytics().logEvent('beta_modal_closed');
//   AsyncStorage.setItem('seenBetaModal', 'true');
//   store.updateOnboardingSeenState('true');
// };

// useEffect(() => {
//   analytics().logEvent('beta_modal_shown');
// }, []);

function Onboarding() {
  const store = useStore();

  return (
    <Box flex={1} backgroundColor="greyBackground">
      <StatusBar backgroundColor="#040506" barStyle="light-content" />
      <SafeAreaView />
      <ViewPager>
        <Box flex={1} paddingHorizontal="m" marginTop="xxl">
          <Text variant="hugeTitle" textAlign="center" paddingHorizontal="xm" marginBottom="xm">
            ברוכות וברוכים הבאים אל Act1
          </Text>
          <Text variant="largeTitle" textAlign="center" paddingHorizontal="xm" marginBottom="m" style={{ direction: 'rtl' }}>
            זוהי גרסת הנסיון הראשונית של Act1, אפליקציה שתקדם את המחאה בישראל.
          </Text>
          <Text variant="largeTitle" textAlign="center" paddingHorizontal="xxl">
            נשמח לפידבק שלכם בקבוצת הפייסבוק שלנו.
          </Text>

          <Box alignItems="center" marginTop="xl">
            <RoundedButton text="בואו נתחיל" color="yellow" onPress={() => closeOnBoardingModal()} />
          </Box>
        </Box>
      </ViewPager>
    </Box>
  );
}

export default Onboarding;
