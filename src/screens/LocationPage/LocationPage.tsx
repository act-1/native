import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/database';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text, StickyHeaderScrollView } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SheetSignUp from '../SignUp/SheetSignUp';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LocationActions, LocationCounter, LocationPictureFeed } from './components';
import CheckInService from '@services/checkIn';
import { updateCheckInCount } from '@services/feed';
import { IPicturePost } from '@types/post';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  database = firebase.app().database('https://act1-dev-default-rtdb.firebaseio.com/');
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

function LocationPage({ navigation, route }: LocationScreenProps) {
  const { userStore } = useStore();
  const [location, setLocation] = useState<ILocation | null>(null);
  const [locatinoPictures, setLocationPictures] = useState<IPicturePost[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: location?.name,
    });
  }, [navigation, location]);

  useEffect(() => {
    const query = firestore()
      .collection('posts')
      .where('locationId', '==', route.params.locationId)
      .where('archived', '==', false)
      .orderBy('createdAt')
      .limit(10);

    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        console.log(snapshot);
        if (snapshot === null) return;
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const picture = change.doc.data() as IPicturePost;
            console.log(picture);
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
      console.log('goodbye');
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
        <LocationCounter locationId={location.id} />

        <LocationActions location={location} />

        <LocationPictureFeed pictures={locatinoPictures} />
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

/**
 * 
 * 
  /**
   * const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['1%', '25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    analytics().logEvent('location_page_sign_up_sheet_display');
  }, []);

  const dismissModal = () => bottomSheetModalRef!.current!.dismiss();
   


 * 
          {/* {userStore.user.isAnonymous && (
            <Box justifyContent="center" alignItems="center" height={110}>
              <Text
                variant="text"
                style={{ color: '#FFC000' }}
                textAlign="center"
                fontWeight="700"
                lineHeight={21.5}
                paddingHorizontal="s"
                marginBottom="xm"
              >
                רוצים לצרף את תמונתכם לרשימת המפגינים.ות ב{location.name}?
              </Text>
              <RoundedButton text="הצטרפות לרשימה" onPress={handlePresentModalPress} color="yellow" />
            </Box>
          )} 

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundComponent={() => (
              <Box style={{ ...StyleSheet.absoluteFillObject, bottom: -1000, backgroundColor: '#333438' }} />
            )}
          >
            <SheetSignUp dismissModal={dismissModal} />
          </BottomSheetModal> 

 */
