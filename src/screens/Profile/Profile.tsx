import React from 'react';
import { Button, Text } from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';
import { Box } from '../../components';
import { RoundedButton } from '../../components/Buttons';

function Profile({ navigation }: ProfileScreenProps) {
  return (
    <Box paddingTop="xl" justifyContent="center" alignItems="center">
      <RoundedButton text="התחברות דרך פייסבוק" color="black" />
    </Box>
  );
  // return <Button title="open me" onPress={() => navigation.navigate('SignUpNavigator', { screen: 'SignUpScreen' })} />;
}

export default Profile;
