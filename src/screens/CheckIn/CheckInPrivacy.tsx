import React, { useState } from 'react';
import { Alert, Pressable, Dimensions, Image, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text } from '../../components';
import { RoundedButton } from '@components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { createTextPost } from '@services/feed';
import { CheckInFormScreenProps } from '@types/navigation';
import Icon from 'react-native-vector-icons/Feather';

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

type PrivacyOptionProps = {
  optionIcon: string;
  optionTitle: string;
  descriptionList: { check: boolean; text: string }[];
  selected: boolean;
  onPress: () => void;
};

const PrivacyOption = ({ optionIcon, optionTitle, descriptionList, selected, onPress }: PrivacyOptionProps) => {
  return (
    <Pressable onPress={onPress}>
      <Box flexDirection="row" paddingHorizontal="l" marginBottom="l" style={{ opacity: selected ? 1 : 0.6 }}>
        <Box style={styles.privacyOptionImage} marginRight="m">
          <Icon name={optionIcon} color="white" size={42.5} />
        </Box>
        <Box>
          <Text variant="largeTitle" marginBottom="s">
            {optionTitle}
          </Text>
          <Box>
            {descriptionList.map((item, index) => (
              <Box flexDirection="row" alignItems="center" marginBottom="xxs" key={index}>
                <Icon
                  name={item.check ? 'check' : 'x'}
                  color={selected ? (item.check ? 'green' : 'tomato') : '#767678'}
                  size={16}
                  style={{ marginRight: 4 }}
                />
                <Text variant="text">{item.text}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  privacyOptionImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#222222',
  },
});
