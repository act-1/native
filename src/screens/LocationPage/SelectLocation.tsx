import React, { useEffect } from 'react';
import { Alert, Image, StatusBar, Platform, ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ILocation } from '@types/location';
import LocationPermissionMessage from './LocationPermissionMessage';
import HapticFeedback from 'react-native-haptic-feedback';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore } = useStore();
  const { userCurrentPosition } = userStore;

  const onLocationPress = async (checkInData: any) => {
    let locationName = '';
    let locationCity = checkInData.city;
    let locationId = '';
    let eventId: null | string = null;

    // Since the location can be either an event or location objects, we have to mormalize the data.
    if (checkInData.endDate) {
      eventId = checkInData.id;
      locationId = checkInData.locationId;
      locationName = checkInData.locationName;

      analytics().logEvent('check_in_select_event');
    } else {
      locationId = checkInData.id;
      locationName = checkInData.name;

      analytics().logEvent('check_in_select_location');
    }

    navigation.navigate('CheckInForm');
    // Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
    //   { text: 'לא עכשיו', onPress: () => analytics().logEvent('check_in_alert_cancel') },
    //   {
    //     text: 'אישור',
    //     onPress: () => {
    //       navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
    //       userStore
    //         .checkIn({ ...checkInData, locationId, locationName, locationCity, eventId })
    //         .then(() => {
    //           analytics().logEvent('check_in_success');
    //         })
    //         .catch((err: any) => {
    //           crashlytics().log('Check in denied; already exists.');
    //           if (userStore.lastCheckIn) crashlytics().setAttribute('lastCheckInId', userStore.lastCheckIn.id);
    //           crashlytics().recordError(err);
    //           if (err.code === 'already-exists') {
    //             Alert.alert("נראה שיש לך כבר צ'ק אין פעיל 🤭");
    //           }
    //         });
    //     },
    //   },
    // ]);
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
