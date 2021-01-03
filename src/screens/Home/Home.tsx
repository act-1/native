import React from 'react';
import { observer } from 'mobx-react-lite';
import { StatusBar, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { EventsWidget } from './Feed/Widgets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenProps } from '@types/navigation';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.header, { height: 46 + insets.top }]}>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" networkActivityIndicatorVisible={false} />
      <Text variant="hugeTitle" fontFamily="Rubik-Medium" fontWeight="500" fontSize={18} style={{ color: '#6E7DFF' }}>
        Act1
      </Text>
    </SafeAreaView>
  );
};

function Home({ navigation }: HomeScreenProps) {
  const onEventPress = (eventId: string, index: number) => {
    navigation.navigate('EventPage', { eventId });
    analytics().logEvent('home_event_pressed', { event_id: eventId, featured_event_index: index + 1 });
  };

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
    backgroundColor: '#fafafa',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    elevation: 5,
    zIndex: 2,
  },
});
