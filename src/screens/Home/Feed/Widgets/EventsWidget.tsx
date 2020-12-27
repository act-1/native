import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores';
import { Box, Text, EventBox } from '@components/';
import { IEvent } from '@types/event';

type EventsWidgetProps = {
  onEventPress: (eventId: string, index: number) => void;
  goToEventList: () => void;
};

function EventsWidget({ onEventPress, goToEventList }: EventsWidgetProps) {
  const { eventStore } = useStore();

  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" paddingHorizontal="m">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
        <Text variant="appLink" textAlign="center" fontWeight="500" onPress={goToEventList}>
          לרשימת ההפגנות
        </Text>
      </Box>
      <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
        {eventStore.events.map((event: IEvent, index: number) => (
          <EventBox variant="thumbBox" {...event} onPress={() => onEventPress(event.id, index)} key={event.id} />
        ))}
      </ScrollView>
    </Box>
  );
}

export default observer(EventsWidget);

const styles = StyleSheet.create({
  featuredEvents: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
});
