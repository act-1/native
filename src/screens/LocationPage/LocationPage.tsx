import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text, ProtestFeed } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationActions, LocationCounter } from './components';
import FastImage from 'react-native-fast-image';

function LocationPage({ navigation, route }: LocationScreenProps) {
  const { userStore } = useStore();
  const [location, setLocation] = useState<ILocation | null>(null);

  // Retrieve location information.
  // First try to hit the cache - then fetch from firestore.
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

  if (location === null) {
    return (
      <Box justifyContent="center" alignItems="center" flex={1}>
        <ActivityIndicator size="small" color="grey" />
        <Text variant="text">טוענת...</Text>
      </Box>
    );
  }

  const locationPageHeader = (
    <Box>
      <FastImage
        source={{ uri: 'https://res.cloudinary.com/onekm/image/upload/v1604300825/weekend_pictures/31-10-2020/zomet_oh.jpg' }}
        style={styles.locationThumb}
      />
      <Box marginTop="m">
        <Box paddingHorizontal="xm" marginBottom="m">
          <Text variant="extraLargeTitle" marginBottom="xxs">
            {location.name}
          </Text>
          <Text variant="largeTitle" fontSize={16} fontWeight="500" opacity={0.8}>
            {location.city}
          </Text>
        </Box>
        <LocationActions location={location} />

        <LocationCounter locationId={location.id} />

        <Box paddingHorizontal="xm" marginBottom="s">
          <Text variant="largeTitle" marginBottom="xxs">
            פיד הפגנה
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return <ProtestFeed locationId={route.params.locationId} headerComponent={locationPageHeader} />;
}

export default observer(LocationPage);

const styles = StyleSheet.create({
  locationThumb: {
    width: '100%',
    height: 200,
  },
  counterText: {
    fontFamily: 'AtlasDL3.1AAA-Medium',
    fontSize: 26,
    color: '#f0f2f5',
    textAlign: 'left',
  },
});
