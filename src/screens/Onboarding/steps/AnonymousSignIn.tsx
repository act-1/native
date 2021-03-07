import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Box, Text } from '../../../components';
import { RoundedButton } from '@components/Buttons';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { signInAnonymously } from '@services/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

function Providers({ nextPage, currentIndex }: BoardingScreenProps) {
  const { userStore } = useStore();
  const navigatino = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('יוצרת חשבון אנונימי...');

  const signInPress = () => {
    signInAnonymously();
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        if (isLoading) {
          setLoadingText('ממש עוד רגע...');
        }
      }, 7250);
    }
  }, [isLoading]);

  // Wait for the user document to be created;
  // If the user document already exists - check whether they completed the sign up.
  useEffect(() => {
    if (currentIndex === 3) {
      if (userStore.userData?.signupCompleted === false) {
        setIsLoading(false);
        navigatino.navigate('SignUp');
      }
    }

    // If the user has signed up but not completed the process, open up the sign up
    // form on app reopen.
    if (currentIndex === 0) {
      if (userStore.userData?.signupCompleted === false) {
        navigatino.navigate('SignUp');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userData, currentIndex]);

  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" paddingHorizontal="xm" style={{ marginTop: -32 }}>
      <Spinner visible={isLoading} textContent={loadingText} overlayColor={'rgba(0, 0, 0, 0.85)'} textStyle={{ color: '#FFF' }} />

      <Image source={require('@assets/illustrations/privacy-image.png')} style={{ marginTop: 36, marginBottom: 25 }} />

      <Text variant="extraLargeTitle" color="primaryColor" textAlign="center" paddingHorizontal="xl" marginBottom="xxm">
        פרטיות היא ערך עליון.
      </Text>

      <Text variant="largeTitle" paddingHorizontal="xl" textAlign="center" marginBottom="xm">
        השימוש באפליקציה אנונימי ולא מצריך פרטים מזהים
      </Text>
      <Text variant="largeTitle" fontSize={15} paddingHorizontal="m" marginBottom="xxm" textAlign="center">
        (אם תרצו, תוכלו להוסיף שם ותמונה)
      </Text>

      <RoundedButton text="התחברות אנונימית" onPress={() => signInPress()} color="blue" style={{ marginBottom: 16 }} />
    </Box>
  );
}

export default observer(Providers);
