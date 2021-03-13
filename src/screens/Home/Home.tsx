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
import MapView from 'react-native-maps';
import EventPagePictures from '../EventPage/EventPagePictures';

import { BlurView } from '@react-native-community/blur';

const MapCounterView = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'android') {
    return <Box style={[styles.mapCounter, { opacity: 0.8, backgroundColor: '#000', elevation: 2 }]}>{children}</Box>;
  } else {
    return (
      <BlurView blurType="extraDark" style={[styles.mapCounter, { width: 75, margin: 12.5 }]}>
        {children}
      </BlurView>
    );
  }
};

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

        <Box marginHorizontal="m">
          {nextEvent && (
            <MapView
              style={{
                height: 275,
                borderRadius: 8,
              }}
              maxZoomLevel={16}
              minZoomLevel={14}
              mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
              initialRegion={{
                latitude: nextEvent?.coordinates._latitude,
                longitude: nextEvent?.coordinates._longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapCounterView>
                <Text variant="boxTitle" fontSize={18} color="primaryColor" textAlign="center">
                  82
                </Text>
                <Text variant="smallText" textAlign="center" fontWeight="600">
                  באיזורך
                </Text>
              </MapCounterView>
            </MapView>
          )}
          <Box height={100} backgroundColor="seperator" borderRadius={8} marginVertical="m"></Box>
        </Box>
        {nextEvent && <EventPagePictures event={nextEvent} size="small" />}

        {/* <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
          תמונות נבחרות
        </Text>

        <FeaturedPictures style={{ marginBottom: 12 }} /> */}

        {/* {liveEvents.length > 0 && (
          <>
            <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
              עכשיו מפגינים
            </Text>

            <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
          </>
        )} */}

        {/* {upcomingEvents.length > 0 && (
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

        {/* {eventStore.pastEvents.length > 0 && (
          <Box marginBottom="xl">
            <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
              הפגנות בשבוע האחרון
            </Text>

            <FeaturedProtests protests={eventStore.pastEvents} />
          </Box>
        )} */}
      </ScrollView>
      <Box position="absolute" bottom={0} left={12 + insets.left}>
        <ActionButton />
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
