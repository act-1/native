import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, StyleSheet, Alert, Pressable } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Text, Box } from '../../components';
import { uploadProfilePicture } from '@services/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

const DEFAULT_PICTURE = 'https://res.cloudinary.com/act1/image/upload/v1610881280/profile_pictures/account-placeholder.png';

function EditProfilePicture() {
  const { userStore } = useStore();
  const [pictureUrl, setPictureUrl] = useState<string>(DEFAULT_PICTURE);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    if (userStore.userData && userStore.userData.profilePicture && userStore.userData.profilePicture !== pictureUrl) {
      setPictureUrl(userStore.userData.profilePicture);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userData]);

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

  const dislpayActionSheet = () => {
    const options = ['בחירת תמונה חדשה', 'ביטול'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        message: 'תמונת פרופיל',
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          editPicture();
        }
        if (buttonIndex === destructiveButtonIndex) {
          // Delete picture
          alert('Deleting picture!');
        }
      }
    );
  };

  return (
    <Box alignItems="center" marginBottom="xm">
      <Pressable onPress={dislpayActionSheet}>
        <Box style={styles.profilePictureWrapper} marginBottom="m">
          {uploadingProfilePic ? (
            <ActivityIndicator color="grey" />
          ) : (
            <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
          )}
        </Box>
      </Pressable>

      <Text color="link" fontSize={18} fontWeight="500" onPress={dislpayActionSheet}>
        שינוי תמונה
      </Text>
    </Box>
  );
}

export default observer(EditProfilePicture);

const styles = StyleSheet.create({
  profilePictureWrapper: {
    height: 85,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#292929',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profilePicture: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});
