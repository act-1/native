import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, EventBox, PostBox } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { HomeScreenProps } from '@types/navigation';
import { IEvent } from '@types/event';
import { NavigationContainer } from '@react-navigation/native';

const posts = [1, 2, 3];

const HomeHeader = () => {
  return <Box style={styles.header} />;
};

function Home({ navigation }: HomeScreenProps) {
  const { eventStore } = useStore();

  if (eventStore.events.length === 0) {
    return <Box />;
  }

  return (
    <ScrollView>
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.featuredEvents} horizontal={true}>
        {eventStore.events.map((event: IEvent) => (
          <EventBox variant="thumbBox" {...event} onPress={() => navigation.navigate('EventPage', { eventId: event.id })} />
        ))}
      </ScrollView>
      <PostFeed posts={posts} />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: 200,
    marginBottom: 12,
    backgroundColor: '#304BFF',
  },
  featuredEvents: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});
