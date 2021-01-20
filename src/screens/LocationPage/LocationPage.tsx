import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, Text, StickyHeaderScrollView } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import { ILocation } from '@types/location';
import { fetchLocation } from '@services/locations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SheetSignUp from '../SignUp/SheetSignUp';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LocationCounter from './LocationCounter';
import LocationActions from './LocationActions';
import CheckInService from '@services/checkIn';
import { updateCheckInCount } from '@services/feed';

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['1%', '25%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    analytics().logEvent('location_page_sign_up_sheet_display');
  }, []);

  const dismissModal = () => bottomSheetModalRef!.current!.dismiss();

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
    <StickyHeaderScrollView
      // goBack={() => navigation.goBack()}
      headerTitle={location.name}
      thumbnail={new URL('https://res.cloudinary.com/onekm/image/upload/v1604300825/weekend_pictures/31-10-2020/zomet_oh.jpg')}
    >
      <BottomSheetModalProvider>
        <Box marginTop="m">
          <Box paddingHorizontal="xm" marginBottom="s">
            <Text variant="extraLargeTitle" marginBottom="xxs">
              {location.name}
            </Text>
            <Text variant="largeTitle" fontSize={16} fontWeight="500" opacity={0.8} marginBottom="m">
              {location.city}
            </Text>
          </Box>

          {/* <Box backgroundColor="seperator" height={2} width={600} marginBottom="s" position="relative" left={-24} /> */}

          <LocationCounter locationId={location.id} style={{ marginBottom: 18 }} />

          <LocationActions />

          {/* <Box backgroundColor="seperator" height={2} width={500} marginVertical="m" /> */}

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
          )} */}

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
        </Box>
      </BottomSheetModalProvider>
    </StickyHeaderScrollView>
  );
}

export default observer(LocationPage);

const styles = StyleSheet.create({
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
