import React, { useState, useEffect, useRef } from 'react';
import { Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { Text, Box } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import RoundedButton from '../../components/Buttons/RoundedButton';
import { updateUserDisplayName, updateUserPicture } from '@services/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckInService from '@services/checkIn';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

type SignUpFormProps = {
  currentIndex?: number;
};

/**
 * The sign up form can be shown from the onboarding screen, or as a standalone modal.
 *
 * In case the form is shown from the onboarding screen, the page `index` prop will be passed to the component,
 * allowing us to focus the text input once the component is shown.
 */
function SignUpForm({ currentIndex }) {
  const { userStore } = useStore();
  const [isLoading, setLoading] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const displayNameInput = useRef<TextInput>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (currentIndex === 3) {
      displayNameInput!.current!.focus();

      if (auth().currentUser) {
        const { photoURL } = auth().currentUser!;

        if (photoURL) {
          setProfilePictureURL(photoURL);
        }
      }
    }
  }, [currentIndex]);

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
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(async (image) => {
      setUploadingProfilePic(true);
      const reference = storage().ref(`/profilePictures/${auth().currentUser!.uid}/new.png`);
      await reference.putFile(image.path);
      const pictureUrl = await reference.getDownloadURL();
      await updateUserPicture(pictureUrl);
      setUploadingProfilePic(false);
    });
  };

  let profilePictureSource = require('../../assets/icons/account.png');
  if (profilePictureURL) {
    profilePictureSource = { uri: profilePictureURL };
  }

  return (
    <Box
      paddingVertical="xm"
      paddingHorizontal="m"
      style={{ paddingTop: insets.top + 40, backgroundColor: 'rgba(0,0,0,0.85)' }}
      flex={1}
    >
      <Box alignItems="center" marginBottom="xm">
        <Box style={styles.profilePictureWrapper}>
          {uploadingProfilePic ? <ActivityIndicator /> : <Image source={profilePictureSource} style={styles.profilePicture} />}
        </Box>

        <Text color="link" fontSize={18} fontWeight="500" marginTop="xm" onPress={editProfilePicture}>
          עריכה
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
