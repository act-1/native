import React from 'react';
import { observer } from 'mobx-react-lite';
import { StatusBar, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { EventsWidget } from './Feed/Widgets';
import { HomeScreenProps } from '@types/navigation';

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar barStyle="dark-content" networkActivityIndicatorVisible={false} />
      <Text variant="hugeTitle" fontSize={24} style={{ color: '#6E7DFF' }}>
        Act1
      </Text>
    </SafeAreaView>
  );
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
    <>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f2f2f2' }}>
        <PostFeed />
      </ScrollView>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 2,
  },
});
