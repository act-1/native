import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box, Text, LocationCounter } from '../../components';
import Ticker from '@components/Ticker';
import { Event } from '@types/collections';

type EventPageCounterProps = {
  event: Event;
  style?: ViewStyle;
};

function EventPageCounter({ event, style }: EventPageCounterProps) {
  if (event.status === 'live') {
    return <LocationCounter locationId={event.locationId} />;
  }

  if (event.status === 'past') {
    return (
      <Box
        justifyContent="center"
        alignItems="center"
        backgroundColor="mainBackground"
        borderColor="lightBorderColor"
        style={[styles.counterBox, style]}
      >
        <Text style={styles.countTextStyle}>{event.protestersCount.toLocaleString()}</Text>
        <Text variant="text">יצאו להפגין</Text>
      </Box>
    );
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      backgroundColor="mainBackground"
      borderColor="lightBorderColor"
      style={[styles.counterBox, style]}
    >
      <Box minHeight={35}>
        <Ticker textStyle={styles.countTextStyle}>{event.attendingCount.toLocaleString()}</Ticker>
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
