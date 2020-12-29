import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, SectionList, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { EventListScreenProps } from '@types/navigation';
import { Box, Text, EventBox } from '../../components';
import { formatEventsForSectionList, EventsSectionListItem } from './event-list-utils';
import { useStore } from '../../stores';
import database from '@react-native-firebase/database';

function EventList({ navigation }: EventListScreenProps) {
  const [eventList, setEventList] = useState<EventsSectionListItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { eventStore } = useStore();

  const onRefresh = async () => {
    // TODO: Handle refresh failure
    setRefreshing(true);
    await eventStore.getEvents();
    analytics().logEvent('event_list_refresh');
    setRefreshing(false);
  };

  useEffect(() => {
    const list = formatEventsForSectionList(eventStore.events);
    setEventList(list);
  }, [eventStore.events]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#7254c8" />
      <Box justifyContent="center" height="100%">
        <Text variant="hugeTitle" color="screenTitle" paddingTop="m" paddingHorizontal="m">
          אירועים קרובים
        </Text>
        {eventList.length === 0 ? (
          <Box justifyContent="center" alignItems="center">
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>טוענת..</Text>
          </Box>
        ) : (
          <SectionList
            sections={eventList}
            renderItem={({ item }) => (
              <EventBox
                {...item}
                onPress={() => {
                  navigation.navigate('EventPage', { eventId: item.id });
                  analytics().logEvent('event_list_event_press', { event_id: item.id });
                }}
              />
            )}
            stickySectionHeadersEnabled={false}
            progressViewOffset={100}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderSectionHeader={({ section: { title, subtitle } }) => (
              <Box marginTop="m" marginLeft="m">
                <Text fontSize={22} textAlign="left" fontFamily="Rubik-Medium">
                  {title}
                </Text>
                <Text fontSize={16} textAlign="left" color="lightText" fontFamily="Rubik-Regular">
                  {subtitle}
                </Text>
              </Box>
            )}
          />
        )}
      </Box>
    </SafeAreaView>
  );
}

export default observer(EventList);
