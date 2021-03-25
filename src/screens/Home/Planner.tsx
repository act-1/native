import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { FeaturedPictures, FeaturedEvents, FeaturedProtests, RecentPicturesWidget } from '@components/Widgets';
import EventCompactBox from '../../components/Widgets/FeaturedEvents/EventCompactBox';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import useUpcomingEvents from './useUpcomingEvents';
import { useNavigation } from '@react-navigation/native';
import FeaturedProtestBox from '@components/Widgets/FeaturedProtests/FeaturedProtestBox';

function Riot() {
  const { userStore, eventStore } = useStore();
  const navigation = useNavigation();

  const [nextEvent, upcomingEvents] = useUpcomingEvents({
    upcomingEvents: eventStore.upcomingEvents,
    userEventIds: userStore.userEventIds,
  });

  return (
    <>
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות נבחרות
      </Text>

      <FeaturedPictures style={{ marginBottom: 12 }} />

      {eventStore.liveEvents.length > 0 && (
        <>
          <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
            עכשיו מפגינים
          </Text>

          <FeaturedProtests protests={eventStore.liveEvents} style={{ marginBottom: 12 }} />
        </>
      )}

      {nextEvent && (
        <>
          <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="m">
            ההפגנה הקרובה
          </Text>

          <FeaturedProtestBox protest={nextEvent} onPress={() => navigation.navigate('EventPage', { eventId: nextEvent.id })} />
        </>
      )}

      {(!eventStore.eventsLoaded || (eventStore.eventsLoaded && upcomingEvents.length) > 0) && (
        <>
          <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="xm" marginBottom="m">
            כל ההפגנות
          </Text>
          <FeaturedEvents events={upcomingEvents} loaded={eventStore.eventsLoaded} style={{ marginBottom: 12 }} />
        </>
      )}

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="m">
        תמונות אחרונות
      </Text>

      <Box height={360} paddingHorizontal="m" marginBottom="l">
        <RecentPicturesWidget />
      </Box>
      {eventStore.pastEvents.length > 0 && (
        <Box marginBottom="xl">
          <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="m">
            הפגנות בשבוע האחרון
          </Text>

          <FeaturedProtests protests={eventStore.pastEvents} />
        </Box>
      )}
    </>
  );
}
export default observer(Riot);

const styles = StyleSheet.create({
  homeWrapper: { flex: 1 },
  scrollViewContainer: { paddingBottom: 24 },

  mapCounter: {
    padding: 8,
    borderRadius: 8,
  },
});
