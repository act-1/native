import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
function Stats() {
  return (
    <Box style={styles.statsWrapper}>
      <Box alignItems="center" style={styles.statItem}>
        <Text variant="boxTitle" fontSize={12}>
          1042
        </Text>
        <Text variant="text" fontSize={12} color="subText">
          השבוע
        </Text>
      </Box>
      <Box alignItems="center" style={styles.statItem}>
        <Text variant="boxTitle" fontSize={12}>
          1042
        </Text>
        <Text variant="text" fontSize={12} color="subText">
          עכשיו
        </Text>
      </Box>
    </Box>
  );
}

export default Stats;

const styles = StyleSheet.create({
  statsWrapper: {
    flexDirection: 'row',
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
