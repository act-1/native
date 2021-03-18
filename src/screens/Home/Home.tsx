import React from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { HomeScreenProps } from '@types/navigation';

import Planner from './Planner';
import Riot from './Riot';

function Home({ navigation }: HomeScreenProps) {
  const { checkInStore } = useStore();
  const { currentCheckIn } = checkInStore;

  return (
    <>
      <ScrollView
        style={styles.homeWrapper}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
        {currentCheckIn ? <Riot regionName={currentCheckIn.locationRegion} /> : <Planner />}
      </ScrollView>
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

{
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
}
// {liveEvents.length > 0 && (
//   <>
//     <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
//       עכשיו מפגינים
//     </Text>

//     <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
//   </>
// )}
