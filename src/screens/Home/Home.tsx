import React, { useRef } from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { Text } from '../../components';
import { Stats, FeaturedPictures, FeaturedEvents, FeaturedProtests } from '@components/Widgets';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Event } from '@types/collections';

function Home() {
  const { eventStore, liveStore } = useStore();
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

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.homeWrapper}
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      {/* <Stats /> */}
      {/* <Button title="check in update" onPress={() => functions().httpsCallable('updateCheckInCountManually')()} /> */}
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

      {eventStore.upcomingEvents.length > 0 && (
        <>
          <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
            הפגנות קרובות
          </Text>

          <FeaturedEvents style={{ marginBottom: 42 }} />
        </>
      )}
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: { flex: 1 },
  scrollViewContainer: { paddingBottom: 24 },
});
