import React, { useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { logEvent } from '@services/analytics';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import LocationPermissionMessage from './LocationPermissionMessage';
import { Location, Event, SelectEntry } from '@types/collections';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore, checkInStore } = useStore();
  const { userCurrentPosition } = userStore;

  const onLocationPress = async (entry: SelectEntry) => {
    let locationName = '';
    const { city, province, coordinates } = entry;

    let locationId = '';
    let eventId: null | string = null;
    let eventName: null | string = null;

    // Since the location can be either an event or location object, we have to mormalize the data.
    if (entry.type === 'location') {
      checkInStore.setCurrentLocation(entry);
      locationId = entry.id;
      locationName = entry.name;

      logEvent('check_in_select_location', { locationId });
    } else {
      checkInStore.setCurrentEvent(entry);
      eventId = entry.id;
      eventName = entry.title;
      locationId = entry.locationId;
      locationName = entry.locationName;

      logEvent('check_in_select_event', { eventId });
    }

    checkInStore.setPendingCheckIn({ locationId, locationName, eventId, eventName, coordinates, city, province });
    navigation.navigate('CheckInPrivacy');
  };

  useEffect(() => {
    if (userCurrentPosition !== undefined && locationStore.fetchingLocations !== true) {
      locationStore.getNearbyLocationsAndEvents(userCurrentPosition);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCurrentPosition]);

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <Image source={require('@assets/pictures/check-in-hero.png')} style={{ height: 475 }} />

      <Box justifyContent="center" alignItems="center" style={{ marginTop: -200 }} marginBottom="m">
        <Text variant="extraLargeTitle" color="primaryColor">
          יצאתן.ם להפגין?
        </Text>
        <Text variant="extraLargeTitle" color="primaryColor">
          עשו צ׳ק אין!
        </Text>
      </Box>

      <Box alignItems="center" justifyContent="center">
        {locationStore.nearbyLocations.length === 0 ? (
          <Box alignItems="center" marginTop="xm">
            <LocationPermissionMessage />
          </Box>
        ) : (
          <Box width="100%">
            {locationStore.nearbyLocations.map((entry: any) => {
              if (entry.type === 'event') {
                const event = entry;
                return <EventBox key={event.locationId} {...event} onPress={() => onLocationPress(event)} />;
              } else {
                const location = entry;
                return <LocationBox key={location.id} location={location} onPress={() => onLocationPress(location)} />;
              }
            })}
          </Box>
        )}
      </Box>
    </ScrollView>
  );
}

export default observer(SelectLocation);
