import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Box, Text, Ticker, RoundedButton, CircularButton } from '../../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { Region } from '@types/collections';
import MapView from 'react-native-maps';
import EventPagePictures from '../../EventPage/EventPagePictures';
import ProvinceCard from '../ProvinceCard';

import useTotalCounter from '../../../hooks/useTotalCounter';

import RiotActions from './RiotActions';
import { BlurView } from '@react-native-community/blur';
import mapStyle from '@utils/mapStyle.json';
import { useNavigation } from '@react-navigation/native';

import ProtestMarker from '@screens/RiotMap/Markers/ProtestMarker';
import ReportMarker from '@screens/RiotMap/Markers/ReportMarker';
import { HomeScreenProps } from '@types/navigation';

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

function Riot({ navigation }: HomeScreenProps) {
  const { userStore, eventStore, checkInStore, mapStore } = useStore();
  const totalCounter = useTotalCounter();

  const { currentCheckIn } = checkInStore;
  const userCoordinates = React.useMemo(() => {
    if (userStore.userCurrentPosition?.length > 0) {
      return {
        latitude: userStore.userCurrentPosition[0],
        longitude: userStore.userCurrentPosition[1],
      };
    } else {
      return { latitude: 31.774979, longitude: 35.217181 };
    }
  }, [userStore.userCurrentPosition]);

  return (
    <>
      <Box marginHorizontal="m">
        <Box overflow="hidden" borderRadius={8}>
          <MapView
            onPress={() => navigation.navigate('RiotMap', { initialCoordinates: userCoordinates })}
            style={{ height: Platform.select({ ios: 320, android: 270 }), width: '100%' }}
            customMapStyle={mapStyle}
            maxZoomLevel={15}
            minZoomLevel={12.5}
            pitchEnabled={false}
            showsCompass={false}
            loadingIndicatorColor="grey"
            loadingBackgroundColor="#222222"
            mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
            initialRegion={{
              ...userCoordinates,
              latitudeDelta: 0.003,
              longitudeDelta: 0.00421,
            }}
          >
            <ProtestMarker
              coordinates={{ latitude: 31.775302, longitude: 35.21766 }}
              counter={432}
              displayed={true}
              onPress={() => navigation.navigate('RiotMap')}
            />
            <ReportMarker reportType="general" coordinates={{ latitude: 31.7756, longitude: 35.214581 }} displayed={true} />
            <ReportMarker
              reportType="policeViolence"
              coordinates={{ latitude: 31.7834, longitude: 35.217181 }}
              displayed={true}
            />
          </MapView>
          <MapCounterView>
            {mapStore?.regions[currentCheckIn.locationRegion]?.counter ? (
              <Ticker
                textStyle={{
                  fontFamily: 'AtlasDL3.1AAA-Bold',
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#eb524b',
                }}
              >
                {mapStore?.regions[currentCheckIn.locationRegion]?.counter.toLocaleString() || 0}
              </Ticker>
            ) : (
              <Text
                style={{
                  fontFamily: 'AtlasDL3.1AAA-Bold',
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#eb524b',
                }}
              >
                --
              </Text>
            )}

            <Text variant="smallText" textAlign="center" fontWeight="600" maxFontSizeMultiplier={1.15}>
              באיזורך
            </Text>
          </MapCounterView>
          <Box style={{ position: 'absolute', right: 8, top: 8, opacity: 0.9 }}>
            <CircularButton
              iconName="maximize-2"
              size="large"
              color="grey"
              onPress={() => navigation.navigate('RiotMap', { initialCoordinates: userCoordinates })}
            />
          </Box>
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
          מפגינים עכשיו ברחבי הארץ
        </Text>
      </Box>

      <Box backgroundColor="seperator" width="100%" height={4} marginBottom="xm" />
      <Box paddingHorizontal="m">
        {Object.values(mapStore.regions)
          .filter((region: Region) => region.counter > 50)
          .sort((a: Region, b: Region) => b.counter - a.counter)
          .map((region: Region) => (
            <ProvinceCard
              key={region.id}
              onPress={() =>
                navigation.navigate('RiotMap', { initialCoordinates: { latitude: region.latitude, longitude: region.longitude } })
              }
              province={region.name}
              counter={region.counter!}
              imageUrl={region.thumbnail!}
              containerStyle={{ marginBottom: 12 }}
            />
          ))}
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
