import React, { useState, useEffect, useRef } from 'react';
import { Image, TextInput, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { Box } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import RoundedButton from '../../components/Buttons/RoundedButton';
import { updateUserDisplayName } from '@services/user';
import { FirebaseAnalyticsTypes } from '@react-native-firebase/analytics';

function SignUpForm() {
  const { userStore } = useStore();
  const [isLoading, setLoading] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const displayNameInput = useRef<TextInput>(null);

  const navigation = useNavigation();

  useEffect(() => {
    displayNameInput!.current!.focus();

    const { photoURL } = auth().currentUser!;

    if (photoURL) {
      setProfilePictureURL(photoURL);
    }
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateUserDisplayName(displayName);
      analytics().logEvent('sign_up_form_submitted');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  let profilePictureSource = require('../../assets/icons/account.png');
  if (profilePictureURL) {
    profilePictureSource = { uri: profilePictureURL };
  }

  return (
    <Box paddingVertical="xm" paddingHorizontal="m">
      <Box alignItems="center" marginBottom="xm">
        <Image source={profilePictureSource} style={styles.profilePicture} />

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
  profilePicture: {
    height: 85,
    width: 85,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#1d262d',
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
