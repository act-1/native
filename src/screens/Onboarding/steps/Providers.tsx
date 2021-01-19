import React, { useEffect, useState } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { facebookLogin, googleLogin } from '@services/auth';
import { uploadProfilePictureFromURL } from '@services/storage';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { storeDecorator } from 'mobx/dist/internal';

function Providers({ nextPage, currentIndex }: BoardingScreenProps) {
  const store = useStore();
  const { userStore } = store;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [highResPhoto, setHighResPhoto] = useState(''); // Upload high res photo once user document has been set up.

  const signIn = async (provider: 'facebook' | 'google') => {
    try {
      setIsLoading(true);

      let result;

      // Sign up / log in - if the user is new upload their high res profile picture (fetched by the login methods).

      switch (provider) {
        case 'facebook':
          result = await facebookLogin();
          break;
        case 'google':
          result = await googleLogin();
          break;
        default:
          throw new Error('Supplied provider is incorrect.');
      }

      console.log(result);

      if (result?.isNewUser || userStore.userData?.signupCompleted === false) {
        if (result.photoURL) {
          setHighResPhoto(result.photoURL);
        }
      }

      if (result.isNewUser === false) {
        await store.initApp();
        nextPage();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      crashlytics().recordError(err);
    }
  };

  // Upload picture once the user document has been created.
  useEffect(() => {
    if (userStore.userData?.signupCompleted === false && highResPhoto.length > 0 && uploadingProfilePic === false) {
      setUploadingProfilePic(true);
      uploadProfilePictureFromURL(highResPhoto)
        .then(() => {
          nextPage();
        })
        .catch((err) => {
          console.log(err);
          crashlytics().recordError(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userData]);

  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" paddingHorizontal="xm">
      <Text variant="largeTitle" fontSize={24} marginBottom="xl">
        מתחברים למהפכה.
      </Text>

      <RoundedButton
        text="התחברות דרך פייסבוק"
        color="darkBlue"
        onPress={() => signIn('facebook')}
        style={{ marginBottom: 16 }}
      />
      <RoundedButton text="התחברות דרך גוגל" color="red" onPress={() => signIn('google')} style={{ marginBottom: 16 }} />
      <RoundedButton text="התחברות דרך אפל" color="black" onPress={() => signIn('google')} style={{ marginBottom: 42 }} />

      <Box height={1} width={320} marginBottom="xm" opacity={0.25} style={{ backgroundColor: '#FFC281' }} />
      <Text variant="text" fontWeight="600" marginBottom="xm" style={{ color: '#FFC281' }} opacity={0.8}>
        מי אנחנו ושאלות נפוצות{' >'}
      </Text>
      <Box height={1} width={320} opacity={0.25} style={{ backgroundColor: '#FFC281' }} marginBottom="xl" />
      <RoundedButton
        text="המשך ללא התחברות"
        color="grey"
        onPress={() => signIn('google')}
        style={{ marginBottom: 42, opacity: 0.4 }}
      />
    </Box>
  );
}

export default observer(Providers);
