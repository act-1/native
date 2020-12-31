import React, { useState, useEffect } from 'react';
import { Alert, Image, AppState, AppStateStatus } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { SelectLocationScreenProps } from '@types/navigation';
import { createUserCheckIn } from '@services/checkIn';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore } = useStore();
  const { userLocationPermission, userCurrentPosition } = userStore;

  const onLocationPress = (locationId: string) => {
    async function createCheckIn(locId: string) {
      try {
        const checkIn = await createUserCheckIn(locId);
        console.log(checkIn);
        navigation.navigate('LocationPage', { locationId: 'pardesiya ' });
      } catch (err) {
        console.error(err);
      }
    }

    Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
      { text: 'לא עכשיו' },
      {
        text: 'אישור',
        onPress: () => createCheckIn(locationId),
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
  }, []);

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
            <EventBox
              time="18:00"
              localDay="יום שבת"
              locationName="כיכר פריז, ירושלים"
              title="מוצ״ש בבלפור"
              thumbnail={
                new URL(
                  'https://res.cloudinary.com/onekm/image/upload/v1609003582/event_thumbs/132223595_181504143674568_5409743636926973174_o_d3qec1.jpg'
                )
              }
              onPress={() => navigation.navigate('LocationPage', { locationId: 'pardesiya ' })}
            />
            <LocationBox
              name="גשר המיתרים"
              locationId="pardesiya"
              address="ירושלים"
              onPress={() => onLocationPress('pardesiya')}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default observer(SelectLocation);
