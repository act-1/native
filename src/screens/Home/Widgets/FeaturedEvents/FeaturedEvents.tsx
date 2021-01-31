import React from 'react';
import { ScrollView, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../../../stores';
import { Box } from '../../../../components';
import { IEvent } from '@types/event';
import EventCompactBox from './EventCompactBox';
import ContentLoader, { Rect } from 'react-content-loader/native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

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
      <Box paddingHorizontal="m">
        <ContentLoader width={deviceWidth} height={deviceHeight} backgroundColor="#222222" foregroundColor="#333333" rtl>
          <Rect x="0" y={0} rx={8} width={154} height={180} />
          <Rect x="3" y={187} width={90} height={12} />
          <Rect x="3" y={204} width={135} height={12} />
          <Rect x="3" y={222} width={108} height={12} />
        </ContentLoader>
      </Box>

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
