import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { EventsWidget } from './Feed/Widgets';
import { HomeScreenProps } from '@types/navigation';

const posts = [1, 2, 3];

const HomeHeader = () => {
  return <Box style={styles.header} />;
};

function Home({ navigation }: HomeScreenProps) {
  const { eventStore } = useStore();

  const onEventPress = (eventId: string, index: number) => {
    navigation.navigate('EventPage', { eventId });
    analytics().logEvent('home_event_pressed', { event_id: eventId, featured_event_index: index + 1 });
  };

  // TODO: Display loading indicator
  if (eventStore.events.length === 0) {
    return <Box />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeHeader />
      <EventsWidget onEventPress={onEventPress} goToEventList={() => navigation.navigate('EventList')} />
      <PostFeed posts={posts} />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: 500,
    marginTop: -350,
    marginBottom: 12,
    backgroundColor: '#334df8',
  },
});
