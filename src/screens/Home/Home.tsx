import React, { useRef } from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Box, Text, ActionButton } from '../../components';
import { FeaturedPictures, FeaturedEvents, FeaturedProtests, RecentPicturesWidget } from '@components/Widgets';
import EventCompactBox from '../../components/Widgets/FeaturedEvents/EventCompactBox';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { HomeScreenProps } from '@types/navigation';
import { Event } from '@types/collections';
import { removeArrayItem } from '@utils/array-utils';

function Home({ navigation }: HomeScreenProps) {
  const { userStore, eventStore, liveStore } = useStore();
  const scrollViewRef = useRef(null);

  useScrollToTop(scrollViewRef);

  const liveEvents = React.useMemo(() => {
    return eventStore.liveEvents
      .map((event: Event) => {
        const protesters = liveStore.locationsCount[event.locationId];
        if (protesters) {
          return { ...event, protesters };
        } else {
          return { ...event, protesters: 0 };
        }
      })
      .sort((a, b) => b.protesters - a.protesters);
  }, [eventStore.liveEvents, liveStore.locationsCount]);

  const [nextEvent, upcomingEvents] = React.useMemo(() => {
    // Check if an upcoming eventId exists in the userEventIds
    let upcoming = eventStore.upcomingEvents;
    const event = eventStore.upcomingEvents.find((event: Event) => userStore.userEventIds.includes(event.id));
    if (event) {
      upcoming = removeArrayItem(upcoming, event);
    }
    return [event, upcoming];
  }, [eventStore.upcomingEvents, userStore.userEventIds]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.homeWrapper}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
        <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
          תמונות נבחרות
        </Text>

        <FeaturedPictures style={{ marginBottom: 12 }} />

        {liveEvents.length > 0 && (
          <>
            <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
              עכשיו מפגינים
            </Text>

            <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
          </>
        )}

        {upcomingEvents.length > 0 && (
          <>
            {nextEvent && (
              <>
                <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
                  ההפגנה הקרובה
                </Text>

                <EventCompactBox
                  {...nextEvent}
                  variant="horizontal"
                  onPress={() => navigation.navigate('EventPage', { eventId: nextEvent.id })}
                />
              </>
            )}
            <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
              כל ההפגנות
            </Text>
            <FeaturedEvents events={upcomingEvents} loaded={eventStore.eventsLoaded} style={{ marginBottom: 12 }} />
          </>
        )}

        <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
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
      <Box position="absolute" bottom={10} left={'40%'}>
        <ActionButton />
      </Box>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: { flex: 1 },
  scrollViewContainer: { paddingBottom: 24 },
});
