import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, StyleSheet } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Text, Box } from '../../components';
import { uploadProfilePicture } from '@services/storage';
import ImagePicker from 'react-native-image-crop-picker';

import { useActionSheet } from '@expo/react-native-action-sheet';

const DEFAULT_PROFILE_PICTURE =
  'https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/profilePicturePlaceholder.png?alt=media&token=06884d2b-b32d-4799-b906-280a7f52ba43';

function EditProfilePicture() {
  const { userStore } = useStore();
  const [profilePictureURL, setProfilePictureURL] = useState<string>(DEFAULT_PROFILE_PICTURE);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);

  useEffect(() => {
    console.log(userStore.userData);
    if (userStore.userData && userStore.userData.profilePicture) {
      setProfilePictureURL(userStore.userData.profilePicture);
    }
  }, [userStore.userData]);

  const editProfilePicture = () => {
    ImagePicker.openPicker({ width: 300, height: 300, cropping: true })
      .then(async (image) => {
        setUploadingProfilePic(true);
        await uploadProfilePicture(image.path);
        setUploadingProfilePic(false);
      })
      .catch((err) => {
        crashlytics().log('Profile picture upload failed.');
        crashlytics().recordError(err);
      });
  };

  return (
    <Box alignItems="center" marginBottom="xm">
      <Box style={styles.profilePictureWrapper} marginBottom="m">
        {uploadingProfilePic ? (
          <ActivityIndicator />
        ) : (
          <Image source={{ uri: profilePictureURL }} style={styles.profilePicture} />
        )}
      </Box>

      <Text color="link" fontSize={18} fontWeight="500" onPress={editProfilePicture}>
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
