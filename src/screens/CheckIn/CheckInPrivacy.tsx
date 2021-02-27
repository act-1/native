import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text } from '../../components';
import PrivacyOption from './PrivacyOption';
import { RoundedButton } from '@components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { createTextPost } from '@services/feed';
import { CheckInFormScreenProps } from '@types/navigation';

const { width: deviceWidth } = Dimensions.get('screen');

function CheckInForm({ navigation, route }: CheckInFormScreenProps) {
  const { userStore } = useStore();
  const [privacySetting, setPrivacySetting] = useState<PrivacyOptions>('PUBLIC');

  const { locationId, locationName, locationCity, locationProvince, coordinates } = route.params.checkInData;

  const submitCheckIn = () => {
    navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
    userStore
      .checkIn({ ...route.params.checkInData, privacySetting, textContent })
      .then(() => {
        // If the user added text, create a new text post
        if (textContent) {
          const locationData = { locationId, locationName, locationCity, locationProvince, coordinates };
          createTextPost({ textContent, locationData });
        }
        analytics().logEvent('check_in_success');
      })
      .catch((err: any) => {
        crashlytics().log('Check in denied; already exists.');
        if (userStore.lastCheckIn) crashlytics().setAttribute('lastCheckInId', userStore.lastCheckIn.id);
        crashlytics().recordError(err);
        if (err.code === 'already-exists') {
          Alert.alert("נראה שיש לך כבר צ'ק אין פעיל 🤭");
        }
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
        onPress={() => setPrivacySetting('PUBLIC')}
      />
      <PrivacyOption
        optionIcon="lock"
        optionTitle="פרטי"
        selected={privacySetting === 'PRIVATE'}
        descriptionList={[
          { check: false, text: 'תמונתך לא תוצג ברשימת המפגינים' },
          { check: true, text: 'נשמר ביומן ההפגנות הפרטי שלך' },
        ]}
        onPress={() => setPrivacySetting('PRIVATE')}
      />
      <PrivacyOption
        optionIcon="eye-off"
        optionTitle="אנונימי"
        descriptionList={[
          { check: false, text: 'תמונתך לא תוצג ברשימת המפגינים' },
          { check: false, text: 'לא יישמר ביומן ההפגנות שלך' },
        ]}
        selected={privacySetting === 'ANONYMOUS'}
        onPress={() => setPrivacySetting('ANONYMOUS')}
      />
      <Box marginTop="xl" marginHorizontal="xl" marginBottom="l">
        <Box marginBottom="m">
          <RoundedButton onPress={submitCheckIn} color="blue" text="צ׳ק אין" style={{ width: '100%' }} />
        </Box>
        <Box opacity={0.5}>
          <RoundedButton onPress={() => navigation.navigate('Home')} color="grey" text="ביטול" style={{ width: '100%' }} />
        </Box>
      </Box>

      <Text variant="text" textAlign="center" opacity={0.8}>
        למדו עוד על פרטיות ב- ACT1
      </Text>
    </Box>
  );
}

export default observer(CheckInForm);
