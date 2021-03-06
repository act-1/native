import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import RoundedButton from '@components/Buttons/RoundedButton';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { submitUserSignUpData } from '@services/user';
import Ivrita from 'ivrita';

function SignUpCompleted({ navigation }) {
  const { userStore } = useStore();
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setisLoading(true);
      submitUserSignUpData(userStore.signUpData);
      // A listener is attached to signupCompleted - when it'll be set to true on firestore, the navigator will change to the home screen (see AppNavigator.tsx).
    } catch (err) {
      throw err;
    }
  };

  const questionPronoun = Ivrita.genderize('אנחנו מוכנות.ים, ואתן.ם?', Ivrita[userStore.signUpData.pronoun]);

  return (
    <Box flex={1}>
      <Text variant="hugeTitle" color="primaryColor" fontSize={68} textAlign="center" marginBottom="xxl">
        ACT1
      </Text>
      <Text variant="hugeTitle" marginBottom="xm" textAlign="center">
        נרשמת בהצלחה!
      </Text>
      <Text variant="largeTitle" marginBottom="xl" textAlign="center">
        {questionPronoun}
      </Text>

      <Box alignItems="center">
        <RoundedButton color="yellow" text="נו יאללה" onPress={onSubmit} loading={isLoading} />
      </Box>
    </Box>
  );
}

export default SignUpCompleted;
