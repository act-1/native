import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, SectionList, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { EventListScreenProps } from '@types/navigation';
import { Box, Text, EventBox } from '../../components';
import { formatEventsForSectionList, EventsSectionListItem } from './event-list-utils';
import { useStore } from '../../stores';

function EventList({ navigation }: EventListScreenProps) {
  const [eventList, setEventList] = useState<EventsSectionListItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const { eventStore } = useStore();

  const onRefresh = async () => {
    // TODO: Handle refresh failure
    setRefreshing(true);
    await eventStore.getEvents();
    setRefreshing(false);
  };

  useEffect(() => {
    const list = formatEventsForSectionList(eventStore.events);
    setEventList(list);
  }, [eventStore.events]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Box justifyContent="center" height="100%">
        {eventList.length === 0 ? (
          <Box justifyContent="center" alignItems="center">
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>טוענת..</Text>
          </Box>
        ) : (
          <SectionList
            sections={eventList}
            renderItem={({ item }) => (
              <EventBox {...item} onPress={() => navigation.navigate('EventPage', { eventId: item.id })} />
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
