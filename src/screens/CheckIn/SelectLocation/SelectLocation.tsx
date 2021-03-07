import React, { useEffect } from 'react';
import { Alert, Image, ScrollView } from 'react-native';
import { logEvent } from '@services/analytics';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import LocationPermissionMessage from './LocationPermissionMessage';
import { SelectEntry } from '@types/collections';
import Ivrita from 'ivrita';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore, checkInStore } = useStore();
  const { userCurrentPosition } = userStore;

  const checkIn = async (entry: SelectEntry) => {
    let locationName = '';
    const { city, province, coordinates } = entry;

    let locationId = '';
    let eventId: null | string = null;
    let eventName: null | string = null;
    let eventThumbnail: null | string = null;
    let blurhash: null | string = null;
    let eventEndDate: null | Date = null;

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
      eventThumbnail = entry.thumbnail;
      blurhash = entry.blurhash;
      // TODO: If the event will be taken from the store instead of being fetched in `locations.ts`,
      // it won't be necessary to transform it `toDate` as it already being done in `events.ts`.
      eventEndDate = entry.endDate.toDate();
      locationId = entry.locationId;
      locationName = entry.locationName;

      logEvent('check_in_select_event', { eventId });
    }

    const checkInData = {
      locationId,
      locationName,
      eventId,
      eventName,
      eventEndDate,
      eventThumbnail,
      blurhash,
      coordinates,
      city,
      province,
    };

    checkInStore.setLastCheckIn(checkInData);

    navigation.dangerouslyGetParent()?.goBack();
    setTimeout(() => {
      navigation.navigate('ProtestDashboard');
    }, 125);

    try {
      await checkInStore.checkIn(checkInData);
      logEvent('check_in_success');
    } catch (err) {
      throw err;
    }
  };

  const onLocationPress = (entry: SelectEntry) => {
    let locationName = '';

    // Extract the location name according the selected entry type (location / event)
    if (entry.type === 'location') {
      locationName = entry.name;
    } else {
      locationName = entry.locationName;
    }

    const alertMessage = `לבצע צ׳ק אין להפגנה ב${locationName}?`;
    Alert.alert('צ׳ק אין', alertMessage, [{ text: 'אישור', onPress: () => checkIn(entry) }, { text: 'ביטול' }]);
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
          {Ivrita.genderize('יצאתן.ם להפגין?', Ivrita[userStore.userData?.pronoun])}
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
                return <EventBox key={event.id} {...event} onPress={() => onLocationPress(event)} />;
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
