import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';
import Ticker from 'react-native-ticker';

type EventPageCounterProps = {
  number: number;
  text: string;
  style?: ViewStyle;
};

function EventPageCounter({ number, text, style }: EventPageCounterProps) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      backgroundColor="mainBackground"
      borderColor="lightBorderColor"
      style={[styles.counterBox, style]}
    >
      <Ticker textStyle={styles.countTextStyle}>{number.toLocaleString()}</Ticker>
      <Text variant="text" color="mainBackground">
        {text}
      </Text>
    </Box>
  );
}

export default EventPageCounter;

const styles = StyleSheet.create({
  counterBox: {
    height: 100,
    marginHorizontal: -2,
    borderWidth: 1,
    backgroundColor: '#7254c8',
  },
  countTextStyle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 30,
    color: '#fff',
  },
});
