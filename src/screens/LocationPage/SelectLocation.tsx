import React, { useState, useEffect } from 'react';
import { Alert, Image, AppState, AppStateStatus, ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { openSettings } from 'react-native-permissions';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ILocation } from '@types/location';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore, locationStore } = useStore();
  const { userLocationPermission, userCurrentPosition } = userStore;

  const onLocationPress = async (locationId: string, eventId?: string) => {
    Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
      { text: 'לא עכשיו' },
      {
        text: 'אישור',
        onPress: () => {
          userStore
            .checkIn(locationId, eventId)
            .then(() => {
              navigation.dispatch(StackActions.replace('LocationPage', { locationId }));
            })
            .catch((err) => {
              // TODO: Add crashlytics report here
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
  } else if (locationStore.nearbyLocations.length === 0) {
    LocationPermissionMessage = (
      <>
        <ActivityIndicator style={{ marginBottom: 8 }} />
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          טוענת מיקומים..
        </Text>
      </>
    );
  }

  return (
    <Box flex={1} width="100%">
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
            {locationStore.nearbyLocations.map((location) => {
              if (location.type === 'event') {
                return (
                  <EventBox
                    key={location.locationId}
                    time="18:00"
                    localDay="יום שבת"
                    locationName={location.locationName}
                    title={location.title}
                    thumbnail={
                      new URL(
                        'https://res.cloudinary.com/onekm/image/upload/v1609003582/event_thumbs/132223595_181504143674568_5409743636926973174_o_d3qec1.jpg'
                      )
                    }
                    onPress={() => onLocationPress(location.locationId, location.id)}
                  />
                );
              } else {
                return (
                  <LocationBox
                    key={location.id}
                    locationId={location.id}
                    name={location.name}
                    address={location.city}
                    onPress={() => onLocationPress(location.id)}
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
