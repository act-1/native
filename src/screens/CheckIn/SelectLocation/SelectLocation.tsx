import React, { useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import LocationPermissionMessage from './LocationPermissionMessage';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore } = useStore();
  const { userCurrentPosition } = userStore;

  const onLocationPress = async (checkInData: any) => {
    let locationName = '';
    let locationCity = checkInData.city;
    let locationProvince = checkInData.province;
    let locationId = '';

    let eventId: null | string = null;
    let eventName: null | string = null;

    // Since the location can be either an event or location objects, we have to mormalize the data.
    if (checkInData.endDate) {
      eventId = checkInData.id;
      eventName = checkInData.title;
      locationId = checkInData.locationId;
      locationName = checkInData.locationName;

      analytics().logEvent('check_in_select_event');
    } else {
      locationId = checkInData.id;
      locationName = checkInData.name;

      analytics().logEvent('check_in_select_location');
    }

    navigation.navigate('CheckInPrivacy', {
      checkInData: { ...checkInData, locationId, locationName, locationCity, locationProvince, eventId, eventName },
    });
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
            {locationStore.nearbyLocations.map((location: any) => {
              if (location.type === 'event') {
                // The location object in this case is an event
                const eventData = location;
                return <EventBox key={eventData.locationId} {...eventData} onPress={() => onLocationPress({ ...eventData })} />;
              } else {
                return (
                  <LocationBox
                    key={location.id}
                    locationId={location.id}
                    name={location.name}
                    address={location.city}
                    onPress={() => onLocationPress({ ...location })}
                  />
                );
              }
            })}
          </Box>
        )}
      </Box>
    </ScrollView>
  );
}

export default observer(SelectLocation);
