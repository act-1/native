import React from 'react';
import {} from 'react-native';
import { Box, Text } from '../../components';
import CommunityStats from './CommunityStats';

const Community = () => {
  return (
    <Box>
      <CommunityStats />
      <Text>אירועים בשבוע האחרון</Text>
      <Box></Box>
    </Box>
  );
};

export default Community;
