import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import crashlytics from '@react-native-firebase/crashlytics';
import MapView from 'react-native-maps';
import { Box, Text, Ticker } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { createUserCheckIn } from '../../services/checkIn';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';

firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

function LocationPage({ route }: LocationScreenProps) {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [counter, setCounter] = useState(null);

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
    <Box flex={1} width="100%">
      <MapView
        style={{ height: 175, marginHorizontal: -12, marginBottom: 16 }}
        maxZoomLevel={14}
        minZoomLevel={14}
        mapPadding={{ right: -25, top: 0, bottom: 0, left: 15 }}
        initialRegion={{
          latitude: 31.7749882,
          longitude: 35.2197916,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Box alignItems="center" justifyContent="center" paddingHorizontal="m" style={{ marginTop: -60 }}>
        <Box shadowOpacity={0.5} shadowOffset={{ width: 0, height: 0 }} shadowRadius={3}>
          <Image source={require('../../assets/icons/map-pin-circular.png')} style={styles.mapPin} />
        </Box>
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          {location.name}
        </Text>
        <Box flexDirection="row">
          <Ticker textStyle={styles.counterText}>{counter}</Ticker>
          <Text style={[styles.counterText, { marginLeft: 7 }]} marginBottom="xm">
            עכשיו בהפגנה
          </Text>
        </Box>

        <Box width="100%" padding="m">
          <Box
            position="absolute"
            style={{ margin: 12 }}
            zIndex={2}
            top={0}
            backgroundColor="mainForeground"
            opacity={0.6}
            height="100%"
            width="100%"
            justifyContent="center"
            borderRadius={3}
          >
            <Text fontSize={28} textAlign="center" fontFamily="Rubik-Bold" color="mainBackground">
              בקרוב
            </Text>
          </Box>
          <RoundedButton text="הזמנת חברים" size="huge" icon={require('@assets/icons/hands-together.png')} />

          <Box flexDirection="row" position="relative" width="100%" marginTop="m">
            <RoundedButton text="העלאת תמונה" size="huge" icon={require('@assets/icons/camera.png')} style={{ flex: 1 }} />
            <Box flex={0.075} />
            <RoundedButton text="גלריית הפגנה" size="huge" icon={require('@assets/icons/gallery.png')} style={{ flex: 1 }} />
          </Box>
        </Box>
      </Box>
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
    color: '#737373',
    textAlign: 'left',
  },
});
