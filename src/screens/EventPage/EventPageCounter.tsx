import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box, Text } from '../../components';

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
      <Text variant="hugeTitle">{number.toLocaleString()}</Text>
      <Text variant="text">{text}</Text>
    </Box>
  );
}

export default EventPageCounter;

const styles = StyleSheet.create({
  counterBox: {
    height: 100,
    borderWidth: 1,
  },
});
