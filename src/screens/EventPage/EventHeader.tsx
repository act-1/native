import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, CircularButton } from '../../components';

function EventHeader({ goBack }: { goBack: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <Box
      position="absolute"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      top={insets.top + 2}
      paddingHorizontal="m"
      zIndex={2}
    >
      <CircularButton onPress={goBack} iconName="arrow-right" color="white" size="small" />
    </Box>
  );
}

export default EventHeader;
