import React from 'react';
import { Platform, Alert, ActionSheetIOS, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from '../../components';
import { CircularButton } from '@components/Buttons';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { useActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const privacyIcon = {
  PUBLIC: 'globe',
  PRIVATE: 'lock',
  ANONYMOUS: 'eye-off',
};

type setPrivacyModeProps = {
  privacyMode: 'PUBLIC' | 'PRIVATE' | 'ANONYMOUS';
  setPrivacyMode: React.Dispatch<React.SetStateAction<'PUBLIC' | 'PRIVATE' | 'ANONYMOUS'>>;
  locationName: string;
  locationCity: string;
  goBack: () => void;
};

function CheckInFormHeader({ privacyMode, setPrivacyMode, locationName, locationCity, goBack }: setPrivacyModeProps) {
  const { showActionSheetWithOptions } = useActionSheet();
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

    // Show privacy info message only once.
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

  return (
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
            {locationName}, {locationCity}
          </Text>
          <TouchableOpacity onPress={goBack} style={{ flexDirection: 'row', alignItems: 'center' }} activeOpacity={0.6}>
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
  );
}

export default CheckInFormHeader;

const styles = StyleSheet.create({
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
