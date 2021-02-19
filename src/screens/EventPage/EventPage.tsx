import React, { useState, useEffect } from 'react';
import { StatusBar, Image } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import MapView, { Marker } from 'react-native-maps';
import HTML from 'react-native-render-html';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { IEvent } from '@types/event';
import { EventPageScreenProps } from '@types/navigation';
import { Box, Text, StickyHeaderScrollView } from '../../components';

import EventPageCounter from './EventPageCounter';
import EventPageActions from './EventPageActions';
import EventPageDetail from './EventPageDetail';

import { formatShortDate, formatUpcomingDate } from '@utils/date-utils';
import mapStyle from '@utils/mapStyle.json';
import HapticFeedback from 'react-native-haptic-feedback';
import { format } from 'date-fns';

function EventPage({ navigation, route }: EventPageScreenProps) {
  const { userStore, eventStore } = useStore();
  const [event, setEvent] = useState<IEvent>();
  const [isAttending, setAttending] = useState(false);

  let eventTime, eventDate, upcomingDate, shortDate;
  if (event) {
    eventTime = format(event.startDate, 'HH:mm');
    upcomingDate = formatUpcomingDate(event.startDate);
    eventDate = format(event.startDate, 'dd/MM/yyyy');
    shortDate = formatShortDate(event.startDate);
  }

  const attendEvent = async () => {
    try {
      const { id: eventId, attendingCount, startDate } = event!;

      if (!isAttending) {
        setAttending(true);
        HapticFeedback.trigger('notificationSuccess');
        await eventStore.attendEvent({ eventId, attendingCount, eventDate: startDate });
      } else {
        setAttending(false);
        HapticFeedback.trigger('notificationError');
        await eventStore.unattendEvent({ eventId, attendingCount });
      }
    } catch (err) {
      crashlytics().setAttribute('eventId', event!.id);
      crashlytics().recordError(err);
      console.error(err);
    }
  };

  useEffect(() => {
    if (route.params?.eventId && eventStore.events.length > 0) {
      const eventData = eventStore.events.find((e: IEvent) => e.id === route.params.eventId);
      if (eventData) setEvent(eventData);
      if (userStore.userEventIds.includes(eventData.id)) {
        setAttending(true);
      }
    }
  }, [route.params, eventStore.events]);

  return (
    <Box flex={1}>
      <StickyHeaderScrollView
        goBack={() => navigation.goBack()}
        headerTitle={event?.title || ''}
        thumbnail={event?.thumbnail || ''}
      >
        {event && (
          <Box backgroundColor="mainBackground">
            <Box paddingVertical="xm" marginBottom="m" backgroundColor="mainBackground" alignItems="center">
              <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
                {event.title}
              </Text>
              <Text variant="text">
                {event.startDate > new Date() ? upcomingDate : eventDate} בשעה {eventTime}
              </Text>
            </Box>

            <Box marginBottom="m">
              {event.attendingCount >= 0 && (
                <EventPageCounter
                  eventStatus={event.status}
                  attendingCount={event.attendingCount}
                  locationId={event.locationId}
                />
              )}
            </Box>

            <EventPageActions eventStatus={event.status} isAttending={isAttending} attendEvent={attendEvent} />

            <Box padding="m" marginBottom="m" backgroundColor="greyBackground">
              <Text variant="largeTitle" marginBottom="m">
                פרטים
              </Text>

              <Box height={50} justifyContent="space-between" marginBottom="xm">
                <EventPageDetail text={`${upcomingDate}, ${shortDate} בשעה ${eventTime}`} iconName="clock" />
                <EventPageDetail text={`${event.locationName}, ${event.city}`} iconName="map-pin" />
              </Box>

              <MapView
                style={{ height: 200, marginHorizontal: -12, marginBottom: 16 }}
                maxZoomLevel={16}
                minZoomLevel={14}
                mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
                initialRegion={{
                  latitude: event.coordinates._latitude,
                  longitude: event.coordinates._longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                customMapStyle={mapStyle}
              >
                <Marker coordinate={{ latitude: event.coordinates._latitude, longitude: event.coordinates._longitude }} />
              </MapView>

              <HTML
                html={event.content}
                tagsStyles={{
                  p: { textAlign: 'left', marginBottom: 12, fontSize: 15, fontFamily: 'AtlasDL3.1AAA-Regular', color: '#fff' },
                  div: { textAlign: 'left', fontFamily: 'AtlasDL3.1AAA-Regular', fontSize: 15 },
                }}
              />
            </Box>
            {event.organizers?.length > 0 && (
              <Box padding="m" backgroundColor="mainBackground">
                <Text variant="largeTitle" marginBottom="m">
                  מארגנים
                </Text>

                {event.organizers.map((org) => (
                  <Box flexDirection="row" alignItems="center" marginBottom="m" key={org.id}>
                    <Image
                      source={{ uri: org.profilePicture }}
                      style={{ width: 35, height: 35, borderRadius: 25, marginEnd: 8 }}
                    />
                    <Text variant="text">{org.name}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </StickyHeaderScrollView>
    </Box>
  );
}

export default observer(EventPage);
