import React, { useEffect } from 'react';
import { Alert, Image, StatusBar, Platform } from 'react-native';
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

    // Normalize event / location data for check in
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

    Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
      { text: 'לא עכשיו', onPress: () => analytics().logEvent('check_in_alert_cancel') },
      {
        text: 'אישור',
        onPress: () => {
          navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
          userStore
            .checkIn({ ...checkInData, locationId, locationName, locationCity, eventId })
            .then(() => {
              analytics().logEvent('check_in_success');
            })
            .catch((err: any) => {
              crashlytics().log('Check in denied; already exists.');
              if (userStore.lastCheckIn) crashlytics().setAttribute('lastCheckInId', userStore.lastCheckIn.id);
              crashlytics().recordError(err);
              if (err.code === 'already-exists') {
                Alert.alert("נראה שיש לך כבר צ'ק אין פעיל 🤭");
              }
            });
        },
      },
    ]);
  };

  useEffect(() => {
    if (userCurrentPosition !== undefined && locationStore.fetchingLocations !== true) {
      locationStore.getNearbyLocationsAndEvents(userCurrentPosition);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCurrentPosition]);

  return (
    <Box flex={1} width="100%">
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />

      <Box alignItems="center" justifyContent="center" marginTop="xl">
        <Image source={require('@assets/illustrations/power-deluxe.png')} style={{ marginBottom: 16 }} />
        <Text variant="extraLargeTitle" fontWeight={'900'} textAlign="center" color="lightText" marginBottom="s">
          יצאתן להפגין? עשו צ׳ק אין!
        </Text>
        <Text variant="text" fontWeight={'400'} textAlign="center" color="lightText" marginBottom="xm">
          ביחד נראה לכל הארץ כמה המחאה שלנו גדולה.
        </Text>

        {locationStore.nearbyLocations.length === 0 ? (
          <LocationPermissionMessage />
        ) : (
          <Box marginTop="m" width="100%">
            {locationStore.nearbyLocations.map((location: any) => {
              if (location.type === 'event') {
                return (
                  <EventBox
                    key={location.locationId}
                    startDate={location.startDate}
                    locationName={location.locationName}
                    title={location.title}
                    thumbnail={new URL(location.thumbnail)}
                    onPress={() => onLocationPress({ ...location })}
                  />
                );
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
    </Box>
  );
}

export default observer(SelectLocation);
