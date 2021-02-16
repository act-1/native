import React from 'react';
import { Box, CircularButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ILocation } from '@types/location';
import Icon from 'react-native-vector-icons/Feather';

function LocationActions({ location }: { location: ILocation }) {
  const navigation = useNavigation();

  const { showActionSheetWithOptions } = useActionSheet();

  // TODO: Refactor to use same code as in new post screen.
  const openLibrary = async () => {
    try {
      await launchImageLibrary({ mediaType: 'photo', quality: 1 }, (image) => {
        console.log(image);
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
    const actionSheetOptions = {
      options: ['צילום תמונה חדשה', 'בחירה מספריית התמונות', 'ביטול'],
      message: 'העלאת תמונה',
      cancelButtonIndex: 3,
      messageTextStyle: { color: '#ededed', fontWeight: 'bold', fontSize: 20, marginTop: 0 },
      textStyle: { marginLeft: -20, marginBottom: 4, color: '#ededed' },
      containerStyle: { backgroundColor: '#2a2a29', paddingBottom: 5 },
      showSeparators: true,
      separatorStyle: { backgroundColor: '#3b3b3b' },
      icons: [
        <Icon name="camera" size={20} color="#ededed" />,
        <Icon name="image" size={20} color="#ededed" />,
        <Icon name="arrow-down" size={20} color="#ededed" />,
      ],
    };

    const callback = (buttonIndex: number) => {
      if (buttonIndex === 0) {
        openCamera();
      }
      if (buttonIndex === 1) {
        openLibrary();
      }
    };

    showActionSheetWithOptions(actionSheetOptions, callback);
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-evenly"
      backgroundColor="sectionListSeperator"
      paddingVertical="xm"
      marginBottom="m"
    >
      <CircularButton
        iconName="message-circle"
        color="blue"
        text="שליחת עדכון"
        onPress={() => navigation.navigate('ActionModal', { screen: 'NewPost', params: { location } })}
      />
      <CircularButton iconName="camera" color="blue" text="העלאת תמונה" onPress={displayUploadOptions} />
      {/* <CircularButton iconName="share" color="blue" text="הזמנת חברים" onPress={() => null} /> */}
    </Box>
  );
}

export default LocationActions;
