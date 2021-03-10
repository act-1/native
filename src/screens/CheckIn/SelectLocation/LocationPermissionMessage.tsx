import React, { useEffect } from 'react';
import { Image, Platform, AppState, AppStateStatus, Linking, ActivityIndicator } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { openSettings } from 'react-native-permissions';
import { Box, Text } from '../../../components';
import { RoundedButton } from '../../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';

/**
 * This component handles all the strange and mysteries of the location permission.
 * It mainly handles situations when the permission is not granted / the device GPS is off
 */
function LocationPermissionMessage() {
  const { userStore, locationStore } = useStore();
  const { userLocationPermission, userCurrentPosition } = userStore;

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

  const requestLocation = async () => {
    try {
      locationStore.fetchingLocations = true;
      const coordinates = await userStore.getUserCoordinates();
      if (coordinates === undefined) locationStore.fetchingLocations = false;

      // The user coordinates doesn't trigger an update in SelectLocation, so we have to call it here.
      // https://github.com/act-1/native/issues/50
      await locationStore.getNearbyLocationsAndEvents(coordinates);
    } catch (err) {
      locationStore.fetchingLocations = false;
    }
  };

  if (locationStore.fetchingLocations === true) {
    return (
      <>
        <ActivityIndicator style={{ marginTop: 60, marginBottom: 8 }} color="grey" size="small" />
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          טוענת מיקומים..
        </Text>
      </>
    );
  }

  if (userLocationPermission === 'blocked') {
    return (
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
          onPress={() => {
            analytics().logEvent('select_location_open_settings_click');
            openSettings();
          }}
          color="grey"
          style={{ marginBottom: 8 }}
          textStyle={{ fontWeight: 'bold' }}
        />
      </>
    );
  } else if (Platform.OS === 'android' && userLocationPermission === 'granted' && userCurrentPosition === undefined) {
    return (
      <>
        <Box backgroundColor="importantLight" width={250} padding="xm" paddingBottom="s" marginBottom="m" borderRadius={3}>
          <Text variant="importantText" textAlign="center" marginBottom="xm">
            שירותי המיקום מנוטרלים.
          </Text>
          <Text variant="importantText" fontWeight="500" textAlign="center" marginBottom="xm">
            על מנת למצוא הפגנות באיזורכם, יש לאפשר שימוש בשירותי המיקום.
          </Text>
        </Box>

        <RoundedButton
          text="הפעלת שירותי מיקום"
          onPress={() => requestLocation()}
          color="grey"
          style={{ marginBottom: 8 }}
          textStyle={{ fontWeight: 'bold' }}
        />
      </>
    );
  } else if (userLocationPermission !== 'granted' || userCurrentPosition?.length === 0) {
    return (
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
    <>
      <Text
        variant="smallText"
        fontFamily="AtlasDL3.1AAA-Bold"
        textAlign="center"
        color="lightText"
        paddingHorizontal="xl"
        marginBottom="s"
      >
        לא נמצאו מוקדי הפגנות באיזורך
      </Text>
      <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="l">
        הפגנות יופיעו כאשר מיקומכם יהיה בסביבת מוקד הפגנה
      </Text>

      <Box width="85%" height={2} backgroundColor="seperator" opacity={0.8} marginBottom="l" />

      <Box opacity={0.67} alignItems="center">
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="m">
          חסר כאן מיקום? ספרו לנו ונדאג שהוא יופיע
        </Text>
        <RoundedButton
          text="שליחת מייל ל- ACT1"
          onPress={() => Linking.openURL('mailto:team@act1.co.il')}
          color="darkBlue"
          textStyle={{ fontWeight: 'bold' }}
        />
      </Box>
    </>
  );
}

export default observer(LocationPermissionMessage);
