import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text, EventBox } from '../../components';
import { useStore } from '../../stores';
import { LiveCheckIns, PostFeed } from './';
import { HomeScreenProps } from '@types/navigation';
import { IEvent } from '@types/event';

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
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="m">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
        <Text
          variant="appLink"
          textAlign="center"
          fontWeight="500"
          onPress={() => {
            analytics().logEvent('home_event_list_link_press');
            navigation.navigate('EventList');
          }}
        >
          לרשימת ההפגנות
        </Text>
      </Box>
      <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
        {eventStore.events.map((event: IEvent, index: number) => (
          <EventBox variant="thumbBox" {...event} onPress={() => onEventPress(event.id, index)} key={event.id} />
        ))}
      </ScrollView>

      <Text variant="largeTitle" paddingHorizontal="m" color="lightText" fontWeight="500">
        מפגינים עכשיו
      </Text>
      <LiveCheckIns />

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
    height: 500,
    marginTop: -350,
    marginBottom: 12,
    backgroundColor: '#334df8',
  },
  featuredEvents: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
