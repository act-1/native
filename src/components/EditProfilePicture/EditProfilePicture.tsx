import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Pressable, Platform } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Text, Box } from '../../components';
import { uploadProfilePicture } from '@services/storage';
import { updateUserPicture } from '@services/user';
import ImagePicker from 'react-native-image-crop-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';

const DEFAULT_PICTURE = 'https://res.cloudinary.com/act1/image/upload/v1610881280/profile_pictures/account-placeholder.png';

function EditProfilePicture({ displayEditLink = true }: { displayEditLink?: boolean }) {
  const { userStore } = useStore();
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const editPicture = () => {
    ImagePicker.openPicker({ width: 200, height: 200, cropping: true })
      .then(async (image) => {
        setUploadingProfilePic(true);
        await uploadProfilePicture(image.path);
        setUploadingProfilePic(false);
      })
      .catch((err) => {
        setUploadingProfilePic(false);
        crashlytics().log('Profile picture upload failed.');
        crashlytics().recordError(err);
      });
  };

  const resetPicture = async () => {
    try {
      setUploadingProfilePic(true);
      await updateUserPicture(DEFAULT_PICTURE, null);
    } catch (err) {
      console.error(err);
      crashlytics().log('Profile picture upload failed.');
      crashlytics().recordError(err);
    } finally {
      setUploadingProfilePic(false);
    }
  };

  const dislpayActionSheet = () => {
    const options = ['בחירת תמונה חדשה', 'מחיקת תמונה'];
    if (Platform.OS === 'ios') options.push('ביטול');
    const icons = [{ iconName: 'image' }, { iconName: 'trash', destructive: true }, { iconName: 'arrow-down' }].map((item) => (
      <Icon name={item.iconName as string} size={20} color={item.destructive ? '#d32f2f' : '#ededed'} />
    ));

    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        icons,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle: { marginLeft: -20, marginBottom: 4, color: '#ededed' },
        containerStyle: { backgroundColor: '#2a2a29' },
        showSeparators: true,
        separatorStyle: { backgroundColor: '#3b3b3b' },
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          editPicture();
        }
        if (buttonIndex === destructiveButtonIndex) {
          resetPicture();
        }
      }
    );
  };

  return (
    <Box alignItems="center">
      <Pressable onPress={dislpayActionSheet}>
        <Box style={styles.profilePictureWrapper} marginBottom="m">
          {uploadingProfilePic ? (
            <ActivityIndicator color="grey" />
          ) : (
            <FastImage source={{ uri: userStore.userData?.profilePicture || DEFAULT_PICTURE }} style={styles.profilePicture} />
          )}
        </Box>
        {displayEditLink && (
          <Text color="link" fontSize={18} fontWeight="500" onPress={dislpayActionSheet}>
            שינוי תמונה
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

export default observer(EditProfilePicture);

const styles = StyleSheet.create({
  profilePictureWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#292929',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 4,
    borderColor: '#393939',
  },
  profilePicture: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});
