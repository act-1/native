import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { facebookLogin } from '@utils/auth-utils';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function SheetSignUp() {
  const [isAuthed, setAuthed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { userStore } = useStore();

  const facebookSignUp = async () => {
    try {
      setLoading(true);
      const result = await facebookLogin();
      console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userStore.user.isAnonymous === false) {
      setAuthed(true);
    }
  }, [userStore.user]);

  let sheetContent = null;

  if (isLoading) {
    sheetContent = (
      <Box justifyContent="center" alignItems="center">
        <ActivityIndicator size="small" />
      </Box>
    );
  }

  if (isAuthed === false) {
    sheetContent = (
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
  } else {
    sheetContent = (
      <Box alignItems="center" padding="m">
        <Box flexDirection="row" paddingHorizontal="xxl" marginBottom="xxl">
          <FastImage
            source={{
              uri: userStore.user.photoURL,
            }}
            style={styles.profilePic}
          />
          <TextInput style={styles.textInput} placeholder="הזינו את שמכם.ן - מומלץ בעברית :)" placeholderTextColor="#a8a8a8" />
        </Box>
        <RoundedButton text="סיום" />
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

const styles = StyleSheet.create({
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    flex: 1,
  },
  textInput: {
    flex: 2,
    color: 'white',
    textAlign: 'right',
    marginLeft: 10,
  },
});
