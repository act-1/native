import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../../../components';
import Icon from 'react-native-vector-icons/Feather';
import StatItem from './StatItem';

function Stats() {
  return (
    <Box style={styles.statsWrapper}>
      <Box flexDirection="row">
        <StatItem title="השבוע" count={1024} />
        <StatItem title="עכשיו" count={320} />
      </Box>

      <Icon name="arrow-left" size={16} color="white" />
    </Box>
  );
}

export default Stats;

const styles = StyleSheet.create({
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    backgroundColor: '#191919',
  },
  statItem: {
    marginHorizontal: 6,
  },
});
