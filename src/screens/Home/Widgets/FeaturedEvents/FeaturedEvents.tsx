import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../../../stores';
import { Box, Text, EventBox } from '../../../../components';
import { IEvent } from '@types/event';

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
    <Box style={style}>
      <ScrollView contentContainerStyle={styles.featuredEvents} showsHorizontalScrollIndicator={false} horizontal={true}>
        {eventStore.events.slice(0, 5).map((event: IEvent, index: number) => (
          <EventBox variant="compactBox" {...event} onPress={() => onEventPress(event.id, index)} key={event.id} />
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

// const event = {
//   locationCity: 'תל אביב',
//   title: 'מצילות את הדמוקרטיה',
//   attendingCount: 161,
//   date: 'היום ',
// };

// function FeaturedEvent({ event }) {
//   return (
//     <Box>
//       <FastImage
//       <Text>{event.title}</Text>
//     </Box>
//   );
// }
