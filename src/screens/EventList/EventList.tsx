import React, { useState, useEffect, ReactElement } from 'react';
import { ActivityIndicator, StatusBar, SectionList, SafeAreaView, SectionListData } from 'react-native';
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
      alignItems="baseline"
      paddingVertical="s"
      paddingHorizontal="m"
      backgroundColor="sectionListSeperator"
    >
      <Text fontSize={16} fontWeight="500" textAlign="left">
        {title}
      </Text>
      <Text marginLeft="xs" fontSize={12} color="lightText">
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
    setEventList(list);
  }, [eventStore.events]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#7254c8" />
      <Box height="100%">
        <Text variant="hugeTitle" color="screenTitle" paddingTop="m" paddingHorizontal="m" marginBottom="m">
          אירועים קרובים
        </Text>
        {eventList.length === 0 ? (
          <Box marginTop="xl" justifyContent="center" alignItems="center">
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
            stickySectionHeadersEnabled={true}
            progressViewOffset={100}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderSectionHeader={({ section }) => renderEventSectionHeader(section)}
          />
        )}
      </Box>
    </SafeAreaView>
  );
}

export default observer(EventList);
