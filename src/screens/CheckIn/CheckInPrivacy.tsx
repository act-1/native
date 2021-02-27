import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, RoundedButton } from '../../components';
import PrivacyOption from './PrivacyOption';
import { CheckInFormScreenProps } from '@types/navigation';
import crashlytics from '@react-native-firebase/crashlytics';
import { logEvent } from '@services/analytics';

function CheckInForm({ navigation, route }: CheckInFormScreenProps) {
  const { userStore } = useStore();
  const [privacySetting, setPrivacySetting] = useState<PrivacyOptions>('PUBLIC');

  const onPrivacySelection = (value: PrivacyOptions) => {
    logEvent('privacy_option_selected', { privacy: value });
    setPrivacySetting(value);
  };

  const { locationId, locationName, locationCity, locationProvince, coordinates } = route.params.checkInData;

  const submitCheckIn = () => {
    // navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
    userStore
      .checkIn({ ...route.params.checkInData, privacySetting })
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
        בחרו את הגדרת הפרטיות עבור הצ'ק אין:
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
      <Box marginTop="xl" marginHorizontal="xxl" marginBottom="l">
        <Box marginBottom="m">
          <RoundedButton onPress={submitCheckIn} color="blue" text="צ׳ק אין" style={{ width: '100%' }} />
        </Box>
        <Box opacity={0.5}>
          <RoundedButton onPress={() => navigation.navigate('Home')} color="grey" text="ביטול" style={{ width: '100%' }} />
        </Box>
      </Box>

      <Text variant="text" textAlign="center" opacity={0.8}>
        עוד על פרטיות ב- ACT1
      </Text>
    </Box>
  );
}

export default observer(CheckInForm);
