import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, TextInput, Platform, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text } from '../../components';
import { RoundedButton } from '@components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { CheckInFormScreenProps } from '@types/navigation';
import CheckInFormHeader from './CheckInFormHeader';

function CheckInForm({ navigation, route }: CheckInFormScreenProps) {
  const { userStore } = useStore();
  const [textContent, setTextContent] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'PUBLIC' | 'PRIVATE' | 'ANONYMOUS'>('PUBLIC');

  const { locationName, locationCity, locationId } = route.params.checkInData;

  const submitCheckIn = () => {
    navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
    userStore
      .checkIn({ ...route.params.checkInData, privacySetting, textContent })
      .then(() => {
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
    <Box flex={1}>
      <CheckInFormHeader
        privacySetting={privacySetting}
        setPrivacySetting={setPrivacySetting}
        locationName={locationName}
        locationCity={locationCity}
        goBack={navigation.goBack}
      />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box margin="m" flexGrow={1.5}>
          <TextInput
            keyboardAppearance="dark"
            placeholder="מסר לאומה..."
            placeholderTextColor="#737373"
            style={styles.textInput}
            autoFocus={true}
            autoCorrect={false}
            multiline={true}
            maxLength={142}
            onChangeText={(value) => setTextContent(value)}
            value={textContent}
          />
        </Box>

        <Box flexDirection="row" alignItems="center" flex={1}>
          <Box flex={1} marginLeft="m">
            <RoundedButton onPress={() => navigation.navigate('Home')} color="grey" text="ביטול" style={{ width: '100%' }} />
          </Box>
          <Box flex={1} marginHorizontal="m">
            <RoundedButton onPress={submitCheckIn} color="blue" text="צ׳ק אין" style={{ width: '100%' }} />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
}

export default observer(CheckInForm);

const styles = StyleSheet.create({
  textInput: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 24,
  },
});
