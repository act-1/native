import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components';
import { RecentPictures, FeaturedProtests } from '@components/Widgets';
import CommunityStats from './CommunityStats';

const Community = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CommunityStats />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <RecentPictures />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
        הפגנות בשבוע האחרון
      </Text>

      <FeaturedProtests />
    </ScrollView>
  );
};

export default Community;
