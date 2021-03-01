import React from 'react';
import { Box, CircularButton } from '../../components';
import { useNavigation } from '@react-navigation/native';

function LocationActions({ isAttending, attendEvent }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="mainBackground" marginBottom="l">
      <CircularButton iconName="check" color={isAttending ? 'green' : 'grey'} text="אישור הגעה" onPress={attendEvent} />
      <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
    </Box>
  );
}

export default LocationActions;
