import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, Image, Platform } from 'react-native';
import { useModal } from 'react-native-modalfy';
import messaging from '@react-native-firebase/messaging';
import { useActionSheet } from '@expo/react-native-action-sheet';
import MapView, { Marker } from 'react-native-maps';
import HTML from 'react-native-render-html';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { IEvent } from '@types/event';
import { EventPageScreenProps } from '@types/navigation';
import { Box, Text, StickyHeaderScrollView, CircularButton } from '../../components';
import { EventPageDetail, EventPageCounter } from './';
import LaunchNavigator from 'react-native-launch-navigator';

const navigateApp = () => {
  LaunchNavigator.navigate('London, UK')
    .then(() => console.log('Launched navigator'))
    .catch((err) => console.error('Error launching navigator: ' + err));
};

function EventPage({ navigation, route }: EventPageScreenProps) {
  const { userStore, eventStore } = useStore();
  const [event, setEvent] = useState<IEvent>();
  const [isAttending, setAttending] = useState(false);
  const [attendingRequestInProgress, setAttendingRequestInProgress] = useState(false);
  const { openModal } = useModal();
  const { showActionSheetWithOptions } = useActionSheet();

  const options = ['Google Maps', 'Moovit', 'Cancel'];
  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        navigateApp();
      }
    }
  );

  const attendEvent = async (event: IEvent) => {
    try {
      const { id: eventId, timestamp: eventDate } = event;
      setAttendingRequestInProgress(true);

      if (!isAttending) {
        const { attended } = await eventStore.attendEvent({ eventId, eventDate, type: 'attend' });
        if (attended) {
          setAttendingRequestInProgress(false);
          setAttending(true);
          setEvent({ ...event, attendingCount: event.attendingCount + 1 });

          // Open modal only if need to request notification permissions.
          if (Platform.OS === 'ios') {
            const authorizationStatus = await messaging().hasPermission();
            if (authorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
              openModal('AttendingModal');
            }
          }
        }
      } else {
        const { removed } = await eventStore.attendEvent({ eventId, type: 'remove' });
        if (removed) {
          setAttendingRequestInProgress(false);
          setAttending(false);
          setEvent({ ...event, attendingCount: event.attendingCount - 1 });
        }
      }
    } catch (err) {
      setAttendingRequestInProgress(false);
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
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      {event === undefined ? (
        <Box justifyContent="center" alignItems="center">
          <ActivityIndicator size="small" color="#0000ff" />
          <Text>טוענת..</Text>
        </Box>
      ) : (
        <StickyHeaderScrollView
          goBack={() => navigation.goBack()}
          headerTitle={event.title}
          thumbnail={event.thumbnail}
        >
          <Box backgroundColor="dimmedBackground">
            <Box paddingVertical="xm" marginBottom="m" backgroundColor="mainBackground" alignItems="center">
              <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
                {event.title}
              </Text>
              <Text variant="text">
                {event.timestamp.toDate() > new Date() ? event.upcomingDate : event.date} בשעה {event.time}
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
              <CircularButton
                iconName="check"
                color={isAttending ? 'green' : 'grey'}
                text={isAttending ? 'אני שם!' : 'אישור הגעה'}
                loading={attendingRequestInProgress}
                onPress={() => attendEvent(event)}
              />
              <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
            </Box>

            <Box padding="m" marginBottom="m" backgroundColor="mainBackground">
              <Text variant="largeTitle" marginBottom="m">
                פרטים
              </Text>

              <Box height={50} justifyContent="space-between" marginBottom="xm">
                <EventPageDetail
                  text={`${event.upcomingDate}, ${event.shortDate} בשעה ${event.time}`}
                  iconName="clock"
                />
                <EventPageDetail text={event.locationName} iconName="map-pin" />
              </Box>

              <MapView
                style={{ height: 175, marginHorizontal: -12, marginBottom: 16 }}
                onPress={() => navigateApp()}
                maxZoomLevel={15}
                minZoomLevel={12}
                mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
                initialRegion={{
                  latitude: event.coordinates._latitude,
                  longitude: event.coordinates._longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{ latitude: event.coordinates._latitude, longitude: event.coordinates._longitude }}
                />
              </MapView>

              <HTML
                html={event.content}
                tagsStyles={{
                  p: { marginBottom: 12, fontSize: 15, fontFamily: 'Rubik-Regular' },
                  div: { textAlign: 'left', fontFamily: 'Rubik-Regular', fontSize: 15 },
                }}
              />
            </Box>
            {event.organizations?.length > 0 && (
              <Box padding="m" backgroundColor="mainBackground">
                <Text variant="largeTitle" marginBottom="m">
                  מארגנים
                </Text>

                {event.organizations.map((org: { id: string; thumbnail: string; title: string }) => (
                  <Box flexDirection="row" alignItems="center" key={org.id}>
                    <Image
                      source={{ uri: org.thumbnail }}
                      style={{ width: 35, height: 35, borderRadius: 25, marginEnd: 8 }}
                    />
                    <Text variant="text">{org.title}</Text>
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
