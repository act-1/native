import React from 'react';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components';
import { Stats, FeaturedPictures, FeaturedEvents, FeaturedProtests } from '@components/Widgets';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function Home() {
  const { eventStore } = useStore();

  return (
    <ScrollView
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

      {eventStore.liveEvents.length > 0 && (
        <>
          <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
            עכשיו מפגינים
          </Text>

          <FeaturedProtests protests={eventStore.liveEvents} style={{ marginBottom: 12 }} />
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
