import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';

const CommunityStats = () => {
  return (
    <TouchableNativeFeedback>
      <Box style={styles.communityStatsWrapper}>
        <Text variant="boxTitle" fontSize={15} opacity={0.84} marginBottom="s">
          3,401 יצאו להפגין בשבוע האחרון
        </Text>
        <Box flexDirection="row">
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=3' }} style={styles.communityStatsProfilePic} />
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=4' }} style={styles.communityStatsProfilePic} />
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=5' }} style={styles.communityStatsProfilePic} />
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=6' }} style={styles.communityStatsProfilePic} />
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=7' }} style={styles.communityStatsProfilePic} />
          <FastImage source={{ uri: 'https://i.pravatar.cc/150?img=8' }} style={styles.communityStatsProfilePic} />
        </Box>
      </Box>
    </TouchableNativeFeedback>
  );
};

export default CommunityStats;

const styles = StyleSheet.create({
  communityStatsWrapper: {
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    backgroundColor: '#191919',
  },
  communityStatsProfilePic: {
    height: 27,
    width: 27,
    borderRadius: 25,
    marginHorizontal: 2.5,
  },
});
