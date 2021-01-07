import React, { useState, useEffect } from 'react';
import { Alert, Image, AppState, AppStateStatus, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { StackActions } from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import { openSettings } from 'react-native-permissions';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ILocation } from '@types/location';
import HapticFeedback from 'react-native-haptic-feedback';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore } = useStore();
  const { userLocationPermission, userCurrentPosition } = userStore;

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
              crashlytics().setAttribute('lastCheckInId', userStore.lastCheckIn.id);
              crashlytics().recordError(err);
              if (err.code === 'already-exists') {
                Alert.alert("נראה שיש לך כבר צ'ק אין פעיל 🤭");
              }

              console.error(err);
            });
        },
      },
    ]);
  };

  useEffect(() => {
    function handleAppStateChange(appState: AppStateStatus) {
      if (appState === 'active') {
        userStore.updateLocationPermission();
      }
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    locationStore.getNearbyLocationsAndEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.userCurrentPosition]);

  const requestLocation = async () => {
    try {
      await userStore.getUserCoordinates();
    } catch (err) {
      console.error(err);
      crashlytics().recordError(err);
    }
  };

  let LocationPermissionMessage = null;

  if (userLocationPermission === 'blocked') {
    LocationPermissionMessage = (
      <>
        <Box backgroundColor="importantLight" width={250} padding="xm" paddingBottom="s" marginBottom="m" borderRadius={3}>
          <Text variant="importantText" textAlign="center" marginBottom="xm">
            שירותי המיקום מנוטרלים.
          </Text>
          <Text variant="importantText" fontWeight="500" textAlign="center" marginBottom="xm">
            על מנת למצוא הפגנות באיזורכם, יש לאפשר שימוש בשירותי המיקום בהגדרות המכשיר.
          </Text>
        </Box>

        <RoundedButton
          text="פתיחת הגדרות המכשיר"
          onPress={() => openSettings()}
          color="grey"
          style={{ marginBottom: 8 }}
          textStyle={{ fontWeight: 'bold' }}
        />
      </>
    );
  } else if (userLocationPermission !== 'granted' || userCurrentPosition?.length === 0) {
    LocationPermissionMessage = (
      <>
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          על מנת לראות את ההפגנות באיזורך, יש לאשר שימוש בשירותי המיקום.
        </Text>
        <RoundedButton
          text="איתור הפגנות באיזורי"
          onPress={() => requestLocation()}
          color="blue"
          textStyle={{ fontWeight: 'bold' }}
        />
      </>
    );
  } else if (locationStore.fetchedLocations === false && locationStore.nearbyLocations.length === 0) {
    LocationPermissionMessage = (
      <>
        <ActivityIndicator style={{ marginTop: 60, marginBottom: 8 }} color="grey" size="small" />
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          טוענת מיקומים..
        </Text>
      </>
    );
  } else if (locationStore.fetchedLocations === true && locationStore.nearbyLocations.length === 0) {
    LocationPermissionMessage = (
      <Box marginTop="xm">
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="m">
          לא נמצאו הפגנות פעילות באיזורך.
        </Text>
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          הפגנות יופיעו כאשר תמצאו בסביבת מוקד הפגנה.
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} width="100%">
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />

      <Box alignItems="center" justifyContent="center" marginTop="xl">
        <Image source={require('@assets/illustrations/power-deluxe.png')} style={{ marginBottom: 16 }} />
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          יצאתן להפגין? עשו צ׳ק אין!
        </Text>
        <Text variant="text" textAlign="center" color="lightText" marginBottom="xm">
          ביחד נראה לכל הארץ כמה המחאה שלנו גדולה.
        </Text>

        {LocationPermissionMessage || (
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
