import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '../../components';
import { RecentPicturesWidget, FeaturedProtests } from '@components/Widgets';
import CommunityStats from './CommunityStats';

import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';

const Community = () => {
  const { eventStore } = useStore();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* <CommunityStats /> */}
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <Box height={360} paddingHorizontal="m" marginBottom="l">
        <RecentPicturesWidget />
      </Box>

      {eventStore.pastEvents.length > 0 && (
        <Box marginBottom="xl">
          <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
            הפגנות בשבוע האחרון
          </Text>

          <FeaturedProtests protests={eventStore.pastEvents} />
        </Box>
      )}
    </ScrollView>
  );
};

export default observer(Community);
