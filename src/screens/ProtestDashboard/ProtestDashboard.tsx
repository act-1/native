import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, Text, LocationCounter } from '../../components';
import { ProtestDashboardProps } from '@types/navigation';
import { logEvent } from '@services/analytics';
import ProtestActionButton from './ProtestActionButton';

function ProtestDashboard({ navigation, route }: ProtestDashboardProps) {
  const { userStore } = useStore();

  React.useLayoutEffect(() => {
    if (route.params?.checkIn?.locationName) {
      navigation.setOptions({
        headerTitle: route.params.checkIn.locationName,
      });
    }
  }, [route]);

  return (
    <Box flex={1} style={{ backgroundColor: '#1e262d' }}>
      {/* <LocationCounter locationId={checkIn.locationId} style={{ backgroundColor: '#000000' }} /> */}
      <Box flexDirection="row" justifyContent="space-evenly">
        <ProtestActionButton />
        <ProtestActionButton />
      </Box>
    </Box>
  );
}

export default observer(ProtestDashboard);
