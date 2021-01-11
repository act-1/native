import React from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import { Box, Text } from '../../components';
import RoundedButton from '../../components/Buttons/RoundedButton';

function SignUpForm() {
  return (
    <Box padding="m">
      <Box alignItems="center" marginBottom="m">
        <Image source={require('../../assets/icons/account.png')} style={styles.profilePicture} />

        <Text variant="appLink" fontWeight="100" marginTop="xs">
          עריכה
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="baseline" padding="m" borderTopWidth={1} borderColor="seperator">
        <Text variant="formLabel" marginRight="xm">
          שם
        </Text>
        <TextInput style={styles.textInputStyle} placeholder="כי אתם מיוחדים" />
      </Box>
      <Box flexDirection="row" justifyContent="center" paddingVertical="xm" borderTopWidth={1} borderColor="seperator">
        <RoundedButton text="סיום הרשמה" color="blue" />
      </Box>
    </Box>
  );
}

export default SignUpForm;

const styles = StyleSheet.create({
  profilePicture: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  textInputStyle: {
    flex: 1,
    borderColor: '#f0f2f5',
    color: '#0078F8',
    textAlign: 'right',
    fontSize: 16,
    borderRadius: 3,
  },
});

{
  /* <Box alignItems="center" padding="m">
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
</Box> */
}

// const styles = StyleSheet.create({
//   profilePic: {
//     width: 80,
//     height: 80,
//     borderRadius: 50,
//     flex: 1,
//   },
//   textInput: {
//     flex: 2,
//     color: 'white',
//     textAlign: 'right',
//     marginLeft: 10,
//   },
// });
