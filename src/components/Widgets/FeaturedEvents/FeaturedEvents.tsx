import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../../stores';
import { Box } from '../..';
import { Event } from '@types/collections';
import EventCompactBox from './EventCompactBox';
import FeaturedEventsContentLoader from './FeaturedEventsContentLoader';

type EventsWidgetProps = {
  style?: ViewStyle;
};

function EventsWidget({ style }: EventsWidgetProps) {
  const { eventStore } = useStore();
  const navigation = useNavigation();
  const widgetContent = useMemo(() => {
    if (eventStore.eventsLoaded) {
      return (
        <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
          {eventStore.upcomingEvents.slice(0, 5).map((event: Event, index: number) => (
            <EventCompactBox {...event} onPress={() => onEventPress(event.id, index)} key={event.id} />
          ))}
        </ScrollView>
      );
    } else {
      return <FeaturedEventsContentLoader />;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventStore.upcomingEvents]);

  const onEventPress = (eventId: string, index: number) => {
    navigation.navigate('EventPage', { eventId });
    analytics().logEvent('events_widget_event_press', { event_id: eventId, featured_event_index: index + 1 });
  };

  return (
    <Box style={style} flex={1} width="100%">
      {widgetContent}
    </Box>
  );
}

export default observer(EventsWidget);

const styles = StyleSheet.create({
  featuredEvents: {
    minWidth: '100%',
  },
});
