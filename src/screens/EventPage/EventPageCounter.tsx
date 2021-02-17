import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import Ticker from '@components/Ticker';

type EventPageCounterProps = {
  number: number;
  text: string;
  style?: ViewStyle;
};

function EventPageCounter({ number, text, style }: EventPageCounterProps) {
  const formattedNumber = number.toLocaleString();

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
      <Text variant="text">{text}</Text>
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
