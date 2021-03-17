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
import mapStyle from '@utils/mapStyle.json';
import { useNavigation } from '@react-navigation/native';

const MapCounterView = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'android') {
    return (
      <Box
        style={[styles.mapCounter, { opacity: 0.8, backgroundColor: 'rgba(0,0,0,0.85)', elevation: 2, paddingHorizontal: 10.5 }]}
      >
        {children}
      </Box>
    );
  } else {
    return (
      <BlurView blurType="extraDark" style={[styles.mapCounter, { width: 75 }]}>
        {children}
      </BlurView>
    );
  }
};

function Riot({ regionName }: { regionName: string }) {
  const { userStore, eventStore, checkInStore } = useStore();
  const [regionCounter, totalCounter] = useRiotCounter(regionName);
  const navigation = useNavigation();

  const { currentCheckIn } = checkInStore;

  return (
    <>
      <Box marginHorizontal="m">
        <Box overflow="hidden" borderRadius={8}>
          <MapView
            onPress={() => navigation.navigate('RiotMap')}
            style={{ height: Platform.select({ ios: 320, android: 270 }) }}
            customMapStyle={mapStyle}
            maxZoomLevel={16}
            minZoomLevel={14}
            mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
            initialRegion={{
              latitude: 31.774979,
              longitude: 35.217181,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <MapCounterView>
            <Ticker
              textStyle={{
                fontFamily: 'AtlasDL3.1AAA-Bold',
                fontSize: 18,
                textAlign: 'center',
                color: '#eb524b',
              }}
            >
              {regionCounter.toLocaleString()}
            </Ticker>
            <Text variant="smallText" textAlign="center" fontWeight="600">
              באיזורך
            </Text>
          </MapCounterView>
        </Box>

        <RiotActions />
      </Box>
      {/* <Box
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
      </Box> */}

      <Box marginTop="xm">
        <EventPagePictures location={{ id: currentCheckIn.locationId, name: currentCheckIn.locationName }} size="small" />
      </Box>
      <Box backgroundColor="seperator" width="100%" height={4} marginBottom="m" />
      <Box alignItems="center">
        <Ticker textStyle={{ fontFamily: 'AtlasDL3.1AAA-Bold', fontSize: 38, textAlign: 'center', color: '#eb524b' }}>
          {totalCounter.toLocaleString()}
        </Ticker>

        <Text variant="largeTitle" textAlign="center" paddingHorizontal="m" marginBottom="xm">
          מפגינים עכשיו בכל הארץ
        </Text>
      </Box>

      <Box backgroundColor="seperator" width="100%" height={4} marginBottom="l" />
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

export default observer(Riot);

const styles = StyleSheet.create({
  mapCounter: {
    position: 'absolute',
    padding: 8,
    margin: 12.5,
    borderRadius: 8,
    alignItems: 'center',
  },
});
