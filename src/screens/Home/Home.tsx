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

import Planner from './Planner';
import Riot from './Riot';

function Home({ navigation }: HomeScreenProps) {
  const { userStore, eventStore, liveStore } = useStore();

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
        style={styles.homeWrapper}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
        <Planner event={eventStore.upcomingEvents[0]} />
      </ScrollView>
    </>
  );
}

{
  /* <InProtest event={nextEvent} /> */
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

// {liveEvents.length > 0 && (
//   <>
//     <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
//       עכשיו מפגינים
//     </Text>

//     <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
//   </>
// )}
