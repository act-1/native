import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { facebookLogin } from '@utils/auth-utils';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function SheetSignUp() {
  const { userStore } = useStore();
  const [isAuthed, setAuthed] = useState(false);

  useEffect(() => {
    if (userStore.user.isAnonymous === false) {
      setAuthed(true);
    }
    console.log(userStore.user);
  }, [userStore.user]);

  return (
    <Box backgroundColor="mainBackground" alignItems="center" padding="m" flex={1}>
      {isAuthed === false ? (
        <>
          <Text variant="largeTitle" color="mainBackground" marginBottom="m">
            התחברות ל- Act1
          </Text>
          <RoundedButton text="התחברות דרך פייסבוק" onPress={facebookLogin} color="blue" />
        </>
      ) : (
        <Box backgroundColor="mainForeground" padding="m">
          <Box flexDirection="row" marginBottom="xxl">
            <FastImage
              source={{
                uri:
                  'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
              }}
              style={styles.profilePic}
            />
            <TextInput style={styles.textInput} placeholder="הזינו את שמכם.ן - מומלץ בעברית :)" placeholderTextColor="grey" />
          </Box>
          <RoundedButton text="סיום" />
        </Box>
      )}
    </Box>
  );
}

export default observer(SheetSignUp);

const styles = StyleSheet.create({
  profilePic: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 50,
  },
  textInput: {
    color: 'white',
    textAlign: 'right',
  },
});
