import React from 'react';
import { Box } from '../../components';
import ActionButton from './ActionButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

export default function ActionScreen() {
  const { showActionSheetWithOptions } = useActionSheet();

  const openLibrary = async () => {
    try {
      await launchImageLibrary({ mediaType: 'photo' }, (response) => {
        console.log(response);
      });
    } catch (err) {
      if (err.code === 'E_PERMISSION_MISSING') {
        Alert.alert(err.code);
      }
    }
  };

  const openCamera = async () => {
    try {
      await launchCamera({ mediaType: 'photo' }, (response) => {
        console.log(response);
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'E_PERMISSION_MISSING') {
        Alert.alert(err.code);
      }
    }
  };

  const displayUploadOptions = () => {
    const options = ['צילום תמונה חדשה', 'בחירה מספריית התמונות', 'ביטול'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
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
    <Box padding="m">
      <ActionButton
        backgroundImage={require('@assets/pictures/check-in-action.png')}
        icon={require('@assets/icons/location-icon.png')}
        title="צ׳ק אין"
        description="הצטרפו להפגנה"
        onPress={openLibrary}
        color="red"
        style={{ marginBottom: 12 }}
      />
      <ActionButton
        backgroundImage={require('@assets/pictures/check-in-action.png')}
        icon={require('@assets/icons/camera.png')}
        title="העלאת תמונה"
        description="המהפכה לא תשודר בטלוויזיה"
        onPress={displayUploadOptions}
        color="blue"
      />
    </Box>
  );
}
