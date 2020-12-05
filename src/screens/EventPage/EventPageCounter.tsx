import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';

type EventPageCounterProps = {
  number: number;
  text: string;
};

function EventPageCounter({ number, text }: EventPageCounterProps) {
  return (
    <Box justifyContent="center" alignItems="center" backgroundColor="dimmedBackground" style={styles.counterBox}>
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
    borderRadius: 6,
    borderColor: '#cdcad6',
  },
});
