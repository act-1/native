import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '../../components';
import { RecentPicturesWidget, FeaturedProtests } from '@components/Widgets';
import CommunityStats from './CommunityStats';

const Community = () => {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <CommunityStats />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <RecentPicturesWidget />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
        הפגנות בשבוע האחרון
      </Text>

      <FeaturedProtests />
    </ScrollView>
  );
};

export default Community;
