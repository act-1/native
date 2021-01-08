import React from 'react';
import { Button, Text } from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';
import { Box } from '../../components';
import { RoundedButton } from '../../components/Buttons';

import { facebookLogin } from '@utils/auth-utils';

function Profile({ navigation }: ProfileScreenProps) {
  return (
    <Box paddingTop="xl" justifyContent="center" alignItems="center">
      <RoundedButton text="התחברות דרך פייסבוק" color="black" onPress={facebookLogin} />
    </Box>
  );
}

export default Profile;
