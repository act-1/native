import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Platform, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import crashlytics from '@react-native-firebase/crashlytics';
import MapView from 'react-native-maps';
import { Box, Text, Ticker } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SheetSignUp from '../SignUp/SheetSignUp';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LocationProfilePictures from './LocationProfilePictures';
import CheckInService from '@services/checkIn';
import mapStyle from '@utils/mapStyle.json';
firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

function LocationPage({ navigation, route }: LocationScreenProps) {
  const { userStore } = useStore();
  const [location, setLocation] = useState<ILocation | null>(null);
  const [counter, setCounter] = useState(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['1%', '25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const addPublicCheckIn = async () => {
    try {
      const checkInInfo = userStore.lastCheckIn;

      if (checkInInfo !== null) {
        await CheckInService.publicCheckIn(checkInInfo);
      } else {
        throw new Error('No check in info present in userStore for public check in.');
      }
    } catch (err) {
      crashlytics().recordError(err);
    }
  };

  // const removeCheckIn = async () => {
  //   try {
  //     if (location !== null && userStore.lastCheckIn !== null) {
  //       const result = await deleteCheckIn({ checkInId: userStore.lastCheckIn.id, locationId: location.id });
  //       if (result.deleted) {
  //         await userStore.deleteLastCheckIn();
  //         navigation.goBack();
  //       }
  //     }
  //   } catch (err) {
  //     crashlytics().recordError(err);
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    let cachedLocation: string | null;
    async function getLocationData(locationId: string) {
      try {
        cachedLocation = await AsyncStorage.getItem(locationId);

        if (cachedLocation) {
          setLocation(JSON.parse(cachedLocation));
        } else {
          const locationData: ILocation = await fetchLocation(route.params.locationId);
          await AsyncStorage.setItem(locationId, JSON.stringify(locationData));
          setLocation(locationData);
        }
      } catch (err) {
        crashlytics().setAttribute('locationId', locationId);
        crashlytics().setAttribute('cachedLocation', '' + cachedLocation);
        crashlytics().recordError(err);
        throw err;
      }
    }

    getLocationData(route.params.locationId);
  }, [route.params.locationId]);

  useEffect(() => {
    const checkInCount = database.ref(`/locationCounter/${route.params.locationId}`);

    checkInCount.on('value', (snapshot) => {
      const count = snapshot.val();
      if (count < 0) {
        crashlytics().setAttributes({ locationId: route.params.locationId });
        crashlytics().log('Check in counter is below zero.');
      }
      setCounter(snapshot.val());
    });

    return () => {
      checkInCount.off();
    };
  }, [route.params.locationId]);

  if (location === null || counter === null) {
    return (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <ActivityIndicator size="small" color="grey" />
        <Text>טוענת..</Text>
      </Box>
    );
  }
  return (
    <Box>
      <BottomSheetModalProvider>
        <MapView
          style={{ height: 175, marginHorizontal: -12, marginBottom: 16 }}
          maxZoomLevel={15}
          minZoomLevel={15}
          mapPadding={{ right: -25, top: 0, bottom: 0, left: 15 }}
          initialRegion={{
            latitude: location.coordinates._latitude,
            longitude: location.coordinates._longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        />
        <Box alignItems="center" justifyContent="center" paddingHorizontal="m" style={{ marginTop: -60 }}>
          <Box shadowOpacity={0.5} shadowOffset={{ width: 0, height: 0 }} shadowRadius={3} elevation={3}>
            <Image source={require('../../assets/icons/map-pin-circular.png')} style={styles.mapPin} />
          </Box>
          <Text variant="extraLargeTitle" marginBottom="xs">
            {location.name}
          </Text>
          <Text variant="largeTitle" fontSize={16} fontWeight="500" opacity={0.9} marginBottom="m">
            {location.city}
          </Text>

          <Box backgroundColor="seperator" height={2} width={500} marginBottom="s" />

          <Box flexDirection="row">
            <Ticker textStyle={styles.counterText}>{counter}</Ticker>
            <Text style={[styles.counterText, { marginLeft: 7 }]} marginBottom="xm">
              עכשיו בהפגנה
            </Text>
          </Box>

          <LocationProfilePictures style={{ marginBottom: 24 }} />

          <RoundedButton
            text="הצטרפות לרשימה"
            onPress={handlePresentModalPress}
            color="blue"
            size="small"
            textStyle={{ fontSize: 14 }}
          />

          <Box backgroundColor="seperator" height={2} width={500} marginVertical="m" />

          {/* <RoundedButton text="delete checkin" onPress={removeCheckIn} /> */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundComponent={() => (
              <Box style={{ ...StyleSheet.absoluteFillObject, bottom: -1000, backgroundColor: '#333438' }} />
            )}
          >
            <SheetSignUp onSuccess={() => addPublicCheckIn()} />
          </BottomSheetModal>
        </Box>
      </BottomSheetModalProvider>
    </Box>
  );
}

export default observer(LocationPage);

const styles = StyleSheet.create({
  mapPin: {
    width: 75,
    height: 75,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  counterText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 26,
    color: '#f0f2f5',
    textAlign: 'left',
  },
});
