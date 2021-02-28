import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
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
  profilePicture: string;
  privacySetting: PrivacyOption;
  setPrivacySetting: React.Dispatch<React.SetStateAction<PrivacyOption>>;
  locationName: string;
  locationCity: string;
  goBack: () => void;
};

function CheckInFormHeader({
  profilePicture,
  privacySetting,
  setPrivacySetting,
  locationName,
  locationCity,
  goBack,
}: setPrivacyModeProps) {
  const { showActionSheetWithOptions } = useActionSheet();

  const updateAnonymousState = async () => {
    const actionSheetOptions = {
      options: ['חזרה', 'פומבי', 'אנונימי'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex === 1) {
        setPrivacySetting('PUBLIC');
      } else if (buttonIndex === 2) {
        setPrivacySetting('ANONYMOUS');
      }
    };

    showActionSheetWithOptions(actionSheetOptions, callback);
  };

  return (
    <Box height={80} backgroundColor="seperator" flexDirection="row" alignItems="center" paddingHorizontal="m">
      <Box flexDirection="row" alignItems="center" flex={1}>
        <FastImage source={{ uri: profilePicture }} style={styles.profilePicture} />
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
          iconName={privacyIcon[privacySetting]}
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
