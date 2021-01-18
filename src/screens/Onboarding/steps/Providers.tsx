import React, { useEffect, useState } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { SafeAreaView } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { facebookLogin, googleLogin } from '@services/auth';
import { uploadProfilePictureFromURL } from '@services/storage';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';

function Providers({ nextPage, currentIndex }: BoardingScreenProps) {
  const { userStore } = useStore();
  const [isLoading, setIsLoading] = useState(false);
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

      if (result?.isNewUser || userStore.userData?.signupCompleted === false) {
        if (result.photoURL) {
          setHighResPhoto(result.photoURL);
        }

        setIsLoading(false);
        nextPage();
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      crashlytics().recordError(err);
    }
  };

  useEffect(() => {
    if (userStore.userData?.signupCompleted === false && highResPhoto.length > 0) {
      uploadProfilePictureFromURL(highResPhoto)
        .then(() => {
          setHighResPhoto('');
          // If the user is still in the providers screen in this stage, it means that they
          // have authneticated but not finished the sign up process.
          if (currentIndex === 2) nextPage();
        })
        .catch((err) => {
          console.log(err);
          crashlytics().recordError(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userData?.signupCompleted]);

  return (
    <Box flex={1} style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
      <SafeAreaView />

      <Box flex={1} justifyContent="flex-start" alignItems="center" marginTop="xm" paddingHorizontal="xm">
        <Text variant="hugeTitle" fontSize={56} fontWeight="900" color="headerTitle" marginTop="xxl" marginBottom="xm">
          ACT1
        </Text>
        <Text variant="largeTitle" fontSize={24} marginBottom="xl">
          מתחברים למהפכה.
        </Text>

        <RoundedButton
          text="התחברות דרך פייסבוק"
          color="darkBlue"
          onPress={() => signIn('facebook')}
          style={{ marginBottom: 16 }}
        />
        <RoundedButton text="התחברות דרך גוגל" color="red" onPress={() => signIn('google')} />
      </Box>
    </Box>
  );
}

export default observer(Providers);
