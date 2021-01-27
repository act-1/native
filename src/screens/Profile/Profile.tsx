import React from 'react';
import { Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProfileScreenProps } from '../../types/navigation';

function Profile({ navigation }: ProfileScreenProps) {
  const { userStore } = useStore();

  return (
    <Box paddingTop="m" justifyContent="center" alignItems="center">
      <FastImage source={{ uri: userStore.userData?.profilePicture }} style={styles.profilePicture} />
      <Button
        title="התנתקות"
        onPress={() => {
          userStore.signOut();
        }}
      />
    </Box>
  );
}

export default observer(Profile);

const styles = StyleSheet.create({
  profilePicture: {
    width: 90,
    height: 90,
    marginBottom: 6,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
