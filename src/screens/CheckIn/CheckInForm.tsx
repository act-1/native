import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
// import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function CheckInForm({ navigation, route }) {
  // const store = useStore();

  return (
    <Box height={80} backgroundColor="seperator">
      <FastImage
        source={{ uri: 'https://avatars.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4' }}
        style={styles.profilePicture}
      />
    </Box>
  );
}

export default observer(CheckInForm);

const styles = StyleSheet.create({
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
