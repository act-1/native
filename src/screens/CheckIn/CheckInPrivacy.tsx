import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, RoundedButton } from '../../components';
import { StackActions } from '@react-navigation/native';
import PrivacyOption from './PrivacyOption';
import { CheckInFormScreenProps } from '@types/navigation';
import crashlytics from '@react-native-firebase/crashlytics';
import HapticFeedback from 'react-native-haptic-feedback';

import { logEvent } from '@services/analytics';

function CheckInPrivacy({ navigation, route }: CheckInFormScreenProps) {
  const { userStore, checkInStore } = useStore();
  const { privacySetting, setPrivacySetting } = checkInStore;

  const onPrivacySelection = (value: PrivacyOption) => {
    logEvent('privacy_option_selected', { privacy: value });
    HapticFeedback.trigger('impactLight');
    setPrivacySetting(value);
  };

  const submitCheckIn = () => {
    navigation.dangerouslyGetParent()?.goBack();

    setTimeout(() => {
      navigation.navigate('ProtestDashboard', { screen: 'Dashboard', params: { checkIn: route.params.checkInData } });
    }, 100);

    userStore
      .checkIn({ privacySetting })
      .then(() => {
        logEvent('check_in_success');
      })
      .catch((err: any) => {
        crashlytics().recordError(err);
      });
  };

  return (
    <Box flex={1} paddingTop="l">
      <Text variant="text" textAlign="center" marginBottom="l">
        בחרו גדרת הפרטיות עבור הצ'ק אין:
      </Text>

      <PrivacyOption
        optionIcon="globe"
        optionTitle="פומבי"
        descriptionList={[
          { check: true, text: 'תמונתך תוצג ברשימת המפגינים' },
          { check: true, text: 'נשמר ביומן ההפגנות הפרטי שלך' },
        ]}
        selected={privacySetting === 'PUBLIC'}
        onPress={() => onPrivacySelection('PUBLIC')}
      />
      <PrivacyOption
        optionIcon="lock"
        optionTitle="פרטי"
        selected={privacySetting === 'PRIVATE'}
        descriptionList={[
          { check: false, text: 'תמונתך לא תוצג ברשימת המפגינים' },
          { check: true, text: 'נשמר ביומן ההפגנות הפרטי שלך' },
        ]}
        onPress={() => onPrivacySelection('PRIVATE')}
      />
      <PrivacyOption
        optionIcon="eye-off"
        optionTitle="אנונימי"
        descriptionList={[
          { check: false, text: 'תמונתך לא תוצג ברשימת המפגינים' },
          { check: false, text: 'לא יישמר ביומן ההפגנות שלך' },
        ]}
        selected={privacySetting === 'ANONYMOUS'}
        onPress={() => onPrivacySelection('ANONYMOUS')}
      />

      <Box marginTop="l" marginHorizontal="xxl" marginBottom="l">
        <Box marginBottom="m">
          <RoundedButton onPress={submitCheckIn} color="blue" text="צ׳ק אין" style={{ width: '100%' }} />
        </Box>
        <Box opacity={0.5}>
          <RoundedButton onPress={() => navigation.navigate('Home')} color="grey" text="ביטול" style={{ width: '100%' }} />
        </Box>
      </Box>

      <Text variant="text" textAlign="center" color="link" opacity={0.6}>
        עוד על פרטיות ב- ACT1
      </Text>
    </Box>
  );
}

export default observer(CheckInPrivacy);
