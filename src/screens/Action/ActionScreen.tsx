import React from 'react';
import { Alert } from 'react-native';
import { Box } from '../../components';
import ActionButton from './ActionButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ActionScreenProps } from '@types/navigation';

export default function ActionScreen({ navigation }: ActionScreenProps) {
  const { showActionSheetWithOptions } = useActionSheet();

  const openLibrary = async () => {
    try {
      await launchImageLibrary({ mediaType: 'photo', quality: 1 }, (image) => {
        if (image.didCancel === true) return; // TODO: ANALYTICS HERE

        navigation.navigate('NewPost', { image, completionScreen: 'closeModal' });
      });
    } catch (err) {
      if (err.code === 'E_PERMISSION_MISSING') {
        Alert.alert('יש לספק הרשאת גישה לספריית התמונות.');
      }
    }
  };

  const openCamera = async () => {
    try {
      await launchCamera({ mediaType: 'photo' }, (image) => {
        if (image.didCancel === true) return; // TODO: ANALYTICS HERE

        navigation.navigate('NewPost', { image, completionScreen: 'closeModal' });
      });
    } catch (err) {
      console.log(err);
      if (err.code === 'E_PERMISSION_MISSING') {
        Alert.alert('יש לספק הרשאות שימוש במצלמה.');
      }
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
    <Box padding="m">
      <ActionButton
        backgroundImage={require('@assets/pictures/check-in-action.png')}
        icon={require('@assets/icons/location-icon.png')}
        title="צ׳ק אין"
        description="יוצאים להפגין, עושים צ׳ק אין"
        onPress={() => navigation.navigate('SelectLocation')}
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
