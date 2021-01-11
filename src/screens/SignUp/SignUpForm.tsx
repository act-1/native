import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import RoundedButton from '../../components/Buttons/RoundedButton';
import { updateUserDisplayName } from '@services/user';

function SignUpForm() {
  const { userStore } = useStore();
  const [isLoading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const displayNameInput = useRef<TextInput>(null);

  useEffect(() => {
    displayNameInput!.current!.focus();
    console.log(userStore.user.photoUrl);
    if (userStore.user.isAnonymous === false && userStore.user.photoUrl) {
      setProfilePicture(userStore.user.photoUrl);
    }
  }, [userStore.user]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateUserDisplayName(displayName);
      alert('success!');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box paddingVertical="xm" paddingHorizontal="m">
      <Box alignItems="center" marginBottom="xm">
        <Image source={require('../../assets/icons/account.png')} style={styles.profilePicture} />

        {/* <Text variant="text" color="" fontWeight="100" marginTop="s">
          עריכה
        </Text> */}
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
          placeholder="הזינו את שמכם.ן (כדאי בעברית)"
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
  profilePicture: {
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
