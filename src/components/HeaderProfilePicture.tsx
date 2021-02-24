import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';

function HeaderProfilePicture({ navigation }) {
  const { currentUser } = auth();
  let profilePicture = '';

  if (currentUser) {
    profilePicture = currentUser.photoURL!;
  }

  const profilePicturePress = () => {
    navigation.navigate('Secondary', { screen: 'ProfileModal' });
  };

  return (
    <Pressable onPress={profilePicturePress} style={styles.profilePictureWrapper}>
      <FastImage source={{ uri: profilePicture }} style={styles.profilePicture} />
    </Pressable>
  );
}

export default HeaderProfilePicture;

const styles = StyleSheet.create({
  profilePictureWrapper: { marginLeft: 16, marginBottom: 2, elevation: 1 },
  profilePicture: { width: 27, height: 27, borderRadius: 25 },
});
