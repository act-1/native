import React from 'react';
import { Button, Text } from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';

function Profile({ navigation }: ProfileScreenProps) {
  return <Button title="open me" onPress={() => navigation.navigate('SignUpNavigator', { screen: 'SignUpScreen' })} />;
}

export default Profile;
