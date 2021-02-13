import React, { useState } from 'react';
import { Alert, ActionSheetIOS, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton, CircularButton } from '@components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import Icon from 'react-native-vector-icons/Feather';
import { CheckInFormScreenProps } from '@types/navigation';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const privacyIcon = {
  PUBLIC: 'globe',
  PRIVATE: 'lock',
  ANONYMOUS: 'eye-off',
};

function CheckInForm({ navigation, route }: CheckInFormScreenProps) {
  const { showActionSheetWithOptions } = useActionSheet();
  const { userStore } = useStore();
  const [textContent, setTextContent] = useState('');
  const [privacyMode, setPrivacyMode] = useState<'PUBLIC' | 'PRIVATE' | 'ANONYMOUS'>('PUBLIC');

  const updateAnonymousState = async () => {
    const actionSheetOptions = {
      options: ['חזרה', 'פומבי', 'פרטי', 'אנונימי'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex === 1) {
        setPrivacyMode('PUBLIC');
      } else if (buttonIndex === 2) {
        setPrivacyMode('PRIVATE');
      } else if (buttonIndex === 3) {
        setPrivacyMode('ANONYMOUS');
      }
    };

    const privacyMessageShown = await AsyncStorage.getItem('checkIn_privacy_message_shown');

    if (privacyMessageShown !== 'true') {
      const message =
        'פומבי - הצ׳ק אין יהיה חשוף לציבור\nפרטי - הצ׳ק אין יהיה חשוף רק בפרופיל הפרטי שלכם\nאנונימי - הצ׳ק אין יבוצע באופן אנונימי לחלוטין ולא יהיה משוייך אל חשבונכם\n';
      Alert.alert('הגדרות פרטיות', message);
      AsyncStorage.setItem('checkIn_privacy_message_shown', 'true');
    }

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(actionSheetOptions, callback);
    } else {
      showActionSheetWithOptions(actionSheetOptions, callback);
    }
  };

  const submitCheckIn = () => {
    navigation.dispatch(StackActions.replace('LocationPage', { locationId: route.params.checkInData.locationId }));
    userStore
      .checkIn({ ...route.params.checkInData, textContent })
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
      <Box height={80} backgroundColor="seperator" flexDirection="row" alignItems="center" paddingHorizontal="m">
        <Box flexDirection="row" alignItems="center" flex={1}>
          <FastImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
            }}
            style={styles.profilePicture}
          />
          <Box marginLeft="m">
            <Text variant="boxTitle" fontSize={17} marginBottom="xxs">
              {route.params.checkInData.locationName}, {route.params.checkInData.locationCity}
            </Text>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ flexDirection: 'row', alignItems: 'center' }}
              activeOpacity={0.6}
            >
              <Text variant="text" marginRight="xxs">
                שינוי מיקום
              </Text>
              <Icon name="chevron-down" size={16} color="white" />
            </TouchableOpacity>
          </Box>
        </Box>
        <Box>
          <CircularButton
            color="black"
            iconName={privacyIcon[privacyMode]}
            size="large"
            iconSize={18}
            onPress={updateAnonymousState}
          />
        </Box>
      </Box>
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
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  textInput: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 24,
  },
});
