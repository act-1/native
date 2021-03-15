import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box } from '../..';
import { Event } from '@types/collections';
import EventCompactBox from './EventCompactBox';
import FeaturedEventsContentLoader from './FeaturedEventsContentLoader';

type EventsWidgetProps = {
  events: Event[];
  loaded: boolean;
  style?: ViewStyle;
};

function EventsWidget({ events, loaded, style }: EventsWidgetProps) {
  const navigation = useNavigation();

  const widgetContent = useMemo(() => {
    if (loaded) {
      return (
        <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
          {events.slice(0, 5).map((event: Event) => (
            <EventCompactBox {...event} onPress={() => onEventPress(event.id)} key={event.id} />
          ))}
        </ScrollView>
      );
    } else {
      return <FeaturedEventsContentLoader />;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const onEventPress = (eventId: string) => {
    navigation.navigate('EventPage', { eventId });
  };

  return (
    <Box style={style} flex={1} width="100%">
      {widgetContent}
    </Box>
  );
}

export default EventsWidget;

const styles = StyleSheet.create({
  featuredEvents: {
    minWidth: '100%',
  },
});
