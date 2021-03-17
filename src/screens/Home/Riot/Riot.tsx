import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Box, Text, Ticker, RoundedButton } from '../../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import MapView from 'react-native-maps';
import EventPagePictures from '../../EventPage/EventPagePictures';
import ProvinceCard from '../ProvinceCard';
import useRiotCounter from '../../../hooks/useRiotCounter';
import RiotActions from './RiotActions';
import { BlurView } from '@react-native-community/blur';

const MapCounterView = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'android') {
    return <Box style={[styles.mapCounter, { opacity: 0.8, backgroundColor: '#000', elevation: 2 }]}>{children}</Box>;
  } else {
    return (
      <BlurView blurType="extraDark" style={[styles.mapCounter, { width: 75, margin: 12.5 }]}>
        {children}
      </BlurView>
    );
  }
};

function InProtest({ regionName }: { regionName: string }) {
  const { userStore, eventStore, checkInStore } = useStore();
  const [regionCounter, totalCounter] = useRiotCounter(regionName);

  if (!checkInStore.currentCheckIn.region) return null;

  return (
    <>
      <Box marginHorizontal="m">
        <MapView
          style={{
            height: 275,
            borderRadius: 8,
          }}
          maxZoomLevel={16}
          minZoomLevel={14}
          mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
          initialRegion={{
            latitude: 31.774979,
            longitude: 35.217181,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapCounterView>
            <Ticker textStyle={{ fontFamily: 'AtlasDL3.1AAA-Bold', fontSize: 18, textAlign: 'center', color: '#eb524b' }}>
              {regionCounter}
            </Ticker>
            <Text variant="smallText" textAlign="center" fontWeight="600">
              באיזורך
            </Text>
          </MapCounterView>
        </MapView>

        <RiotActions />
      </Box>

      <Box
        flexDirection="row"
        alignItems="flex-start"
        paddingVertical="m"
        paddingLeft="m"
        paddingRight="xl"
        marginTop="m"
        marginHorizontal="m"
        backgroundColor="seperator"
        borderRadius={8}
      >
        <Text fontSize={30} marginRight="m">
          ⚠️
        </Text>
        <Box>
          <Text variant="text" fontWeight="600" marginBottom="xxs">
            המשטרה עצרה 4 מפגינים.
          </Text>
          <Text variant="text" fontWeight="600" paddingRight="xm" marginBottom="m">
            מחפשים מתנדבים שיוכלו לחכות מחוץ לתחנה.
          </Text>
          <RoundedButton color="yellow" text="אני יכולה לחכות" size="small" textStyle={{ fontSize: 14.5 }} />
        </Box>
      </Box>

      {/* <Box marginTop="m">{event && <EventPagePictures event={event} size="small" />}</Box> */}

      <Box backgroundColor="seperator" width="100%" height={4} marginBottom="m" />

      <Box alignItems="center">
        <Ticker textStyle={{ fontFamily: 'AtlasDL3.1AAA-Bold', fontSize: 38, textAlign: 'center', color: '#eb524b' }}>
          {totalCounter}
        </Ticker>

        <Text variant="largeTitle" textAlign="center" paddingHorizontal="m" marginBottom="xm">
          מפגינים עכשיו בכל הארץ
        </Text>
      </Box>

      <Box backgroundColor="seperator" width="100%" height={4} marginBottom="m" />

      <Box paddingHorizontal="m">
        <ProvinceCard
          province="ירושלים"
          counter={194}
          imageUrl="https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/uploaded_pictures%2FAE2185BD-C838-498E-BB24-90C0EC6E9195.jpg?alt=media&token=c3d9e825-a168-47ba-b4d6-8eb41283587d"
          containerStyle={{ marginBottom: 12 }}
        />
        <ProvinceCard
          province="תל אביב"
          counter={932}
          imageUrl="https://res.cloudinary.com/act1/image/upload/v1614841195/featured_pictures/purimistors.jpg"
          containerStyle={{ marginBottom: 12 }}
        />
        <ProvinceCard
          province="חיפה"
          counter={283}
          imageUrl="https://res.cloudinary.com/act1/image/upload/v1615733637/featured_pictures/main_image44730_medium_hme0rv.jpg"
        />
      </Box>
    </>
  );
}

export default observer(InProtest);

const styles = StyleSheet.create({
  mapCounter: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});
