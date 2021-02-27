import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, LocationCounter } from '../../components';
import { ProtestDashboardProps } from '@types/navigation';
import { logEvent } from '@services/analytics';

function ProtestDashboard({ navigation, route }: ProtestDashboardProps) {
  const { userStore } = useStore();
  const { checkIn } = route.params;

  React.useLayoutEffect(() => {
    if (checkIn.locationName) {
      navigation.setOptions({
        headerTitle: checkIn.locationName,
      });
    }
  }, [checkIn]);

  return (
    <Box flex={1} paddingTop="l">
      <Text variant="text">Hi</Text>
      <LocationCounter locationId={checkIn.locationId} />
    </Box>
  );
}

export default observer(ProtestDashboard);
