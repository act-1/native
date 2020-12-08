import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Box, CircularButton } from '../../components';

function EventHeader() {
  const insets = useSafeAreaInsets();

  return (
    <Box
      position="absolute"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      top={insets.top - 5}
      paddingHorizontal="m"
      zIndex={2}
    >
      {/* <Icon name="map-pin" size={50} color="red" style={{ position: 'absolute', top: Dimensions, left: 20, zIndex: 2 }} /> */}
      <CircularButton iconName="arrow-right" color="white" size="small" />
      <CircularButton iconName="more-horizontal" color="white" size="small" />
    </Box>
  );
}

export default EventHeader;
