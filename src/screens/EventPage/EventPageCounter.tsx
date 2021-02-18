import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import Ticker from '@components/Ticker';
import LocationCounter from '@screens/LocationPage/components/LocationCounter';

type EventPageCounterProps = {
  eventMode: EventStatus;
  attendingCount: number;
  locationId: string;
  style?: ViewStyle;
};

function EventPageCounter({ eventMode, attendingCount, locationId, style }: EventPageCounterProps) {
  if (eventMode === 'live') {
    return <LocationCounter locationId={locationId} />;
  }

  const formattedNumber = attendingCount.toLocaleString();

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      backgroundColor="mainBackground"
      borderColor="lightBorderColor"
      style={[styles.counterBox, style]}
    >
      <Box minHeight={35}>
        <Ticker textStyle={styles.countTextStyle}>{formattedNumber}</Ticker>
      </Box>
      <Text variant="text">יוצאים להפגין</Text>
    </Box>
  );
}

export default EventPageCounter;

const styles = StyleSheet.create({
  counterBox: {
    height: 100,
    marginHorizontal: -2,
    borderWidth: 0,
    backgroundColor: '#111111',
  },
  countTextStyle: {
    fontFamily: 'AtlasDL3.1AAA-Bold',
    fontSize: 30,
    color: '#fff',
  },
});
