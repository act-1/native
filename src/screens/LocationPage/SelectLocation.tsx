import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, LocationBox, EventBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import LocationPermissionMessage from './LocationPermissionMessage';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore } = useStore();
  const { userCurrentPosition } = userStore;

  const onLocationPress = async (checkInData: any) => {
    let locationName = '';
    let locationCity = checkInData.city;
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

    navigation.navigate('CheckInForm', {
      checkInData: { ...checkInData, locationId, locationName, locationCity, eventId, eventName },
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
