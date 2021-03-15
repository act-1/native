import React, { useRef } from 'react';
import { StatusBar, StyleSheet, ScrollView, Platform } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Box, Text, ActionButton } from '../../components';
import { FeaturedPictures, FeaturedEvents, FeaturedProtests, RecentPicturesWidget } from '@components/Widgets';
import EventCompactBox from '../../components/Widgets/FeaturedEvents/EventCompactBox';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { HomeScreenProps } from '@types/navigation';
import { Event } from '@types/collections';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useUpcomingEvents from './useUpcomingEvents';
import ProvinceCard from './ProvinceCard';

import InProtest from './InProtest';

function Home({ navigation }: HomeScreenProps) {
  const { userStore, eventStore, liveStore } = useStore();
  const scrollViewRef = useRef(null);
  const insets = useSafeAreaInsets();

  useScrollToTop(scrollViewRef);

  const [nextEvent, upcomingEvents] = useUpcomingEvents({
    upcomingEvents: eventStore.upcomingEvents,
    userEventIds: userStore.userEventIds,
  });

  // const liveEvents = React.useMemo(() => {
  //   return eventStore.liveEvents
  //     .map((event: Event) => {
  //       const protesters = liveStore.locationsCount[event.locationId];
  //       if (protesters) {
  //         return { ...event, protesters };
  //       } else {
  //         return { ...event, protesters: 0 };
  //       }
  //     })
  //     .sort((a, b) => b.protesters - a.protesters);
  // }, [eventStore.liveEvents, liveStore.locationsCount]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.homeWrapper}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
        {/* <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
          תמונות נבחרות
        </Text>
        <FeaturedPictures style={{ marginBottom: 12 }} /> */}
        <InProtest event={nextEvent} />
        <Box backgroundColor="seperator" width="100%" height={4} marginBottom="m" />

        <Text variant="hugeTitle" textAlign="center" color="primaryColor">
          1,312
        </Text>

        <Text variant="largeTitle" textAlign="center" paddingHorizontal="m" marginBottom="xm">
          מפגינים עכשיו בכל הארץ
        </Text>

        <Box backgroundColor="seperator" width="100%" height={4} marginBottom="m" />

        <Box paddingHorizontal="m">
          <ProvinceCard
            province="ירושלים"
            counter={194}
            imageUrl="https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/uploaded_pictures%2FAE2185BD-C838-498E-BB24-90C0EC6E9195.jpg?alt=media&token=c3d9e825-a168-47ba-b4d6-8eb41283587d"
            containerStyle={{ marginBottom: 12 }}
          />
          <ProvinceCard
            province="תל אביב"
            counter={932}
            imageUrl="https://res.cloudinary.com/act1/image/upload/v1614841195/featured_pictures/purimistors.jpg"
            containerStyle={{ marginBottom: 12 }}
          />
          <ProvinceCard
            province="חיפה"
            counter={283}
            imageUrl="https://res.cloudinary.com/act1/image/upload/v1615733637/featured_pictures/main_image44730_medium_hme0rv.jpg"
          />
        </Box>
        {/* {liveEvents.length > 0 && (
          <>
            <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
              עכשיו מפגינים
            </Text>

            <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
          </>
        )}

        

        {/* 
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
        )} */}

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
      <Box position="absolute" bottom={0} left={12 + insets.left}>
        {/* <ActionButton /> */}
      </Box>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: { flex: 1 },
  scrollViewContainer: { paddingBottom: 24 },

  mapCounter: {
    padding: 8,
    borderRadius: 8,
  },
});
