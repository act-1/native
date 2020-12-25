import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Text, EventBox, PostBox } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { HomeScreenProps } from '@types/navigation';
import { IEvent } from '@types/event';
import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';

const posts = [1, 2, 3];

const HomeHeader = () => {
  return <Box style={styles.header} />;
};

function Home({ navigation }: HomeScreenProps) {
  const { eventStore } = useStore();

  // TODO: Display loading indicator
  if (eventStore.events.length === 0) {
    return <Box />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeHeader />
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="m">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
        <Text variant="appLink" textAlign="center" fontWeight="500" onPress={() => navigation.navigate('EventList')}>
          לרשימת ההפגנות
        </Text>
      </Box>
      <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
        {eventStore.events.map((event: IEvent) => (
          <EventBox
            variant="thumbBox"
            {...event}
            onPress={() => navigation.navigate('EventPage', { eventId: event.id })}
            key={event.id}
          />
        ))}
      </ScrollView>

      <Text variant="largeTitle" paddingHorizontal="m" color="lightText" fontWeight="500">
        פיד מחאה
      </Text>

      <PostFeed posts={posts} />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: 150,
    marginBottom: 12,
    backgroundColor: '#304BFF',
  },
  featuredEvents: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
