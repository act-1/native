import React from 'react';
import { Box, CircularButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ILocation } from '@types/location';

function LocationActions({ location }: { location: ILocation }) {
  const navigation = useNavigation();

  const { showActionSheetWithOptions } = useActionSheet();

  // TODO: Refactor to use same code as in new post screen.
  const openLibrary = async () => {
    try {
      await launchImageLibrary({ mediaType: 'photo', quality: 1 }, (image) => {
        if (image.didCancel === true) return; // TODO: ANALYTICS HERE
        navigation.navigate('ActionModal', { screen: 'NewPost', params: { image, location } });
      });
    } catch (err) {
      console.log(err);
      // if (err.code === 'E_PERMISSION_MISSING') {
      //   Alert.alert(err.code);
      // }
    }
  };

  const openCamera = async () => {
    try {
      await launchCamera({ mediaType: 'photo', quality: 1 }, (image) => {
        if (image.didCancel === true) return; // TODO: ANALYTICS HERE
        navigation.navigate('ActionModal', { screen: 'NewPost', params: { image, location } });
      });
    } catch (err) {
      console.log(err);
      // if (err.code === 'E_PERMISSION_MISSING') {
      //   Alert.alert(err.code);
      // }
    }
  };

  const displayUploadOptions = () => {
    const options = ['צילום תמונה חדשה', 'בחירה מספריית התמונות', 'ביטול'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        containerStyle: { paddingBottom: 5 },
        message: 'העלאת תמונה',
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          openCamera();
        }
        if (buttonIndex === 1) {
          openLibrary();
        }
      }
    );
  };

  return (
    <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="greyBackground" paddingVertical="xm" marginBottom="m">
      {/* <CircularButton iconName="map-pin" color="blue" text="צ׳ק אין" onPress={() => null} /> */}
      <CircularButton iconName="camera" color="blue" text="העלאת תמונה" onPress={displayUploadOptions} />
      {/* <CircularButton iconName="share" color="blue" text="הזמנת חברים" onPress={() => null} /> */}
    </Box>
  );
}

export default LocationActions;
