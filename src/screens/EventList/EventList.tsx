import React, { useState, useEffect } from 'react';
import { StatusBar, SectionList, SafeAreaView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Box, Text, EventBox } from '../../components';
import { formatEventsForSectionList, EventsSectionListItem } from './event-list-utils';
import { useStore } from '../../stores';

function EventList({ navigation }) {
  const [eventList, setEventList] = useState<EventsSectionListItem[]>([]);
  const store = useStore();

  useEffect(() => {
    console.log('Event List events: ', store.events);
    const list = formatEventsForSectionList(store.events);
    setEventList(list);
  }, [store.events]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Box justifyContent="center" height="100%">
        {eventList.length === 0 ? (
          <Text>טוענת.. </Text>
        ) : (
          <SectionList
            sections={eventList}
            renderItem={({ item }) => (
              <EventBox {...item} onPress={() => navigation.navigate('EventPage', { eventId: item.id })} />
            )}
            stickySectionHeadersEnabled={false}
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
