import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { facebookLogin } from '@utils/auth-utils';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

type SheetSignUpProps = {
  dismissModal: () => void;
};

function SheetSignUp({ dismissModal }: SheetSignUpProps) {
  const { userStore } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  const facebookSignUp = async () => {
    try {
      setLoading(true);
      await facebookLogin();
      dismissModal();
    } catch (err) {
      crashlytics().recordError(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  let sheetContent = (
    <Box alignItems="center" paddingHorizontal="m" flex={1}>
      <Text variant="largeTitle" marginBottom="m">
        התחברות ל- Act1
      </Text>
      <Text variant="text" textAlign="center" marginBottom="xm">
        על מנת להתווסף לרשימה יש להזדהות באחת הדרכים הבאות:
      </Text>
      <RoundedButton text="התחברות דרך פייסבוק" onPress={facebookSignUp} color="blue" />
    </Box>
  );

  if (loading) {
    sheetContent = (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <ActivityIndicator size="small" color="grey" />
      </Box>
    );
  }

  if (error) {
    sheetContent = (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <Text variant="text" textAlign="center">
          ארעה שגיאה.
        </Text>
      </Box>
    );
  }

  return (
    <Box padding="m" style={{ ...StyleSheet.absoluteFillObject }} flex={1}>
      {sheetContent}
    </Box>
  );
}

export default observer(SheetSignUp);
