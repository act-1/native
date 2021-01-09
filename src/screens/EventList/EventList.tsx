import React, { useState, useEffect, ReactElement } from 'react';
import { StatusBar, SectionList, SafeAreaView, SectionListData, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { EventListScreenProps } from '@types/navigation';
import { IEvent } from '@types/event';
import { Box, Text, EventBox } from '../../components';
import { formatEventsForSectionList, EventsSectionListItem } from './event-list-utils';
import { useStore } from '../../stores';

function renderEventSectionHeader({ title, subtitle }: SectionListData<IEvent, EventsSectionListItem>): ReactElement {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingVertical="s"
      paddingHorizontal="m"
      backgroundColor="sectionListSeperator"
      elevation={1}
    >
      <Text fontSize={16} fontWeight="100" textAlign="left" color="lightText">
        {title}
      </Text>
      <Text fontSize={12} color="lightText">
        {subtitle}
      </Text>
    </Box>
  );
}

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
    setEventList([...list]);
  }, [eventStore.events]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Box height="100%">
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
          stickySectionHeadersEnabled={true}
          progressViewOffset={100}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ece1e1" />}
          renderSectionHeader={({ section }) => renderEventSectionHeader(section)}
          ListEmptyComponent={() => (
            <Box marginTop="xxl" justifyContent="center" alignItems="center">
              <Text variant="smallText" color="lightText">
                לא נמצאו אירועים קרובים.
              </Text>
            </Box>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}

export default observer(EventList);
