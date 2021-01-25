import React from 'react';
import { Box, CircularButton } from '../../../components';

function LocationActions() {
  return (
    <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="greyBackground" paddingVertical="xm" marginBottom="m">
      <CircularButton iconName="map-pin" color="blue" text="צ׳ק אין" onPress={() => null} />
      <CircularButton iconName="camera" color="blue" text="העלאת תמונה" onPress={() => null} />
      <CircularButton iconName="share" color="blue" text="הזמנת חברים" onPress={() => null} />
    </Box>
  );
}

export default LocationActions;
