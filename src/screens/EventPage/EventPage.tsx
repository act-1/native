import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, Image } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import MapView, { Marker } from 'react-native-maps';
import HTML from 'react-native-render-html';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { IEvent } from '@types/event';
import { EventPageScreenProps } from '@types/navigation';
import { Box, Text, StickyHeaderScrollView, CircularButton } from '../../components';
import EventPageCounter from './EventPageCounter';
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
  }, [eventStore.events, route.params, userStore.userEventIds]);

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" />
      {event === undefined ? (
        <Box justifyContent="center" alignItems="center">
          <ActivityIndicator size="small" />
          <Text>טוענת...</Text>
        </Box>
      ) : (
        <StickyHeaderScrollView goBack={() => navigation.goBack()} headerTitle={event.title} thumbnail={event.thumbnail}>
          <Box backgroundColor="mainBackground">
            <Box paddingVertical="xm" marginBottom="m" backgroundColor="mainBackground" alignItems="center">
              <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
                {event.title}
              </Text>
              <Text variant="text">
                {event.startDate > new Date() ? upcomingDate : eventDate} בשעה {eventTime}
              </Text>
            </Box>

            <EventPageCounter number={event.attendingCount} text="אישרו הגעה" style={{ marginBottom: 12 }} />

            <Box
              flexDirection="row"
              justifyContent="space-evenly"
              backgroundColor="mainBackground"
              paddingVertical="xm"
              marginBottom="m"
            >
              <CircularButton iconName="check" color={isAttending ? 'green' : 'grey'} text="אישור הגעה" onPress={attendEvent} />
              <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
            </Box>

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
        </StickyHeaderScrollView>
      )}
    </Box>
  );
}

export default observer(EventPage);
