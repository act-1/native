import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../../../stores';
import { Box } from '../../../../components';
import { IEvent } from '@types/event';
import EventCompactBox from './EventCompactBox';

type EventsWidgetProps = {
  style?: ViewStyle;
};

function EventsWidget({ style }: EventsWidgetProps) {
  const { eventStore } = useStore();
  const navigation = useNavigation();

  const onEventPress = (eventId: string, index: number) => {
    navigation.navigate('EventPage', { eventId });
    analytics().logEvent('events_widget_event_press', { event_id: eventId, featured_event_index: index + 1 });
  };

  return (
    <Box style={style} flex={1} width="100%">
      <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
        {eventStore.events.slice(0, 5).map((event: IEvent, index: number) => (
          <EventCompactBox {...event} onPress={() => onEventPress(event.id, index)} key={event.id} />
        ))}
      </ScrollView>
    </Box>
  );
}

export default observer(EventsWidget);

const styles = StyleSheet.create({
  featuredEvents: {
    minWidth: '100%',
  },
});
