import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text, PostBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationActions, LocationCounter, LocationPictureFeed } from './components';
import CheckInService from '@services/checkIn';
import { updateCheckInCount } from '@services/feed';
import { IPicturePost } from '@types/post';
import FastImage from 'react-native-fast-image';

function LocationPage({ navigation, route }: LocationScreenProps) {
  const { userStore } = useStore();
  const [location, setLocation] = useState<ILocation | null>(null);
  const [locationPictures, setLocationPictures] = useState<IPicturePost[]>([]);

  React.useLayoutEffect(() => {
    if (location?.name) {
      navigation.setOptions({
        headerTitle: location.name,
      });
    }
  }, [location, navigation]);

  useEffect(() => {
    const query = firestore()
      .collection('posts')
      .where('locationId', '==', route.params.locationId)
      .where('archived', '==', false)
      .orderBy('createdAt')
      .limit(10);

    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        if (snapshot === null) return;
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const picture = change.doc.data() as IPicturePost;
            setLocationPictures((prevState) => [picture, ...prevState]);
          }
        });
      },
      (error) => {
        crashlytics().recordError(error);
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [route.params.locationId]);

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
  return (
    <ScrollView style={{ flex: 1 }}>
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

        <PostBox />
        {/* <LocationPictureFeed pictures={locationPictures} /> */}
      </Box>
    </ScrollView>
  );
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
