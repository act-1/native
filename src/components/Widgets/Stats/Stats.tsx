import React from 'react';
import { StyleSheet } from 'react-native';
import { Box } from '../..';
import Icon from 'react-native-vector-icons/Feather';
import StatItem from './StatItem';
import { useNavigation } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

function Stats() {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback onPress={() => navigation.navigate('Community')}>
      <Box style={styles.statsWrapper}>
        <Box flexDirection="row">
          <StatItem title="מפגינים" count={3501} />
          <StatItem title="השבוע" count={1024} />
          <StatItem title="עכשיו" count={320} />
        </Box>

        <Icon name="arrow-left" size={16} color="white" />
      </Box>
    </TouchableNativeFeedback>
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
