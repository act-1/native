import React, { useState, useEffect, useRef } from 'react';
import { Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Text, Box } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import RoundedButton from '../../components/Buttons/RoundedButton';
import { updateUserDisplayName } from '@services/user';
import { uploadProfilePicture } from '@services/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckInService from '@services/checkIn';
import ImagePicker from 'react-native-image-crop-picker';

type SignUpFormProps = {
  currentIndex?: number;
};

const DEFAULT_PROFILE_PICTURE =
  'https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/profilePicturePlaceholder.png?alt=media&token=06884d2b-b32d-4799-b906-280a7f52ba43';

/**
 * The sign up form can be shown from the onboarding screen, or as a standalone modal.
 *
 * In case the form is shown from the onboarding screen, the page `index` prop will be passed to the component,
 * allowing us to focus the text input once the component is shown.
 */
function SignUpForm({ currentIndex }: SignUpFormProps) {
  const { userStore } = useStore();
  const [isLoading, setLoading] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  // TODO: Change to production url
  const [profilePictureURL, setProfilePictureURL] = useState<string>(DEFAULT_PROFILE_PICTURE);
  const [displayName, setDisplayName] = useState('');
  const displayNameInput = useRef<TextInput>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (currentIndex === 3) {
      displayNameInput!.current!.focus();
    }
  }, [currentIndex]);

  useEffect(() => {
    console.log(userStore.userData);
    if (userStore.userData && userStore.userData.profilePicture) {
      setProfilePictureURL(userStore.userData.profilePicture);
    }
  }, [userStore.userData]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateUserDisplayName(displayName);
      setLoading(false);
      analytics().logEvent('sign_up_form_submitted');

      // Add public check in
      // const checkInInfo = userStore.lastCheckIn;
      // await CheckInService.publicCheckIn({ checkInInfo, displayName, profilePictureURL });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

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
    <Box
      paddingVertical="xm"
      paddingHorizontal="m"
      style={{ paddingTop: insets.top + 40, backgroundColor: 'rgba(0,0,0,0.85)' }}
      flex={1}
    >
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
      <Box
        flexDirection="row"
        alignItems="baseline"
        paddingVertical="m"
        paddingHorizontal="s"
        borderTopWidth={1}
        borderColor="seperator"
      >
        <TextInput
          ref={displayNameInput}
          style={styles.textInputStyle}
          accessibilityLabel="הזינו את שמכם"
          placeholder="הזינו את שמכם.ן"
          placeholderTextColor="#8d8d8d"
          onChangeText={(text) => setDisplayName(text)}
        />
      </Box>
      <Box height={1} backgroundColor="seperator" style={{ marginBottom: 20 }} />
      <Box flexDirection="row" justifyContent="center" borderColor="seperator" marginBottom="xm">
        <RoundedButton text="סיום הרשמה" color="blue" onPress={onSubmit} disabled={displayName.length < 2} loading={isLoading} />
      </Box>
    </Box>
  );
}

export default observer(SignUpForm);

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
  textInputStyle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    borderColor: '#f0f2f5',
    borderRadius: 3,
  },
});
