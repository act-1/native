import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import ProtestMarker from './ProtestMarker';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import RiotMapBottomSheet from './RiotMapBottomSheet';

const { height, width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const protestMarkers = [
  {
    id: 'balfur',
    coordinates: { latitude: 31.774979, longitude: 35.217181 },
    name: 'כיכר פריז',
    city: 'ירושלים',
    counter: 281,
  },
  {
    id: 'tel-aviv',
    coordinates: { latitude: 32.083645, longitude: 34.8003023 },
    name: 'כיכר דיזינגוף',
    city: 'תל אביב',
    counter: 2942,
  },
];

function RiotMap({ navigation }: RiotMapProps) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [currentSheetIndex, setCurrrentSheetIndex] = useState(0);
  const [selectedProtest, setSelectedProtest] = useState({});

  const onMarkerPress = useCallback(
    (protest: any) => {
      setSelectedProtest(protest);

      // Workaround to delay the bottom sheet expansion after the region animation
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 50);

      mapRef.current?.animateToRegion(
        {
          latitude: protest.coordinates.latitude,
          longitude: protest.coordinates.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        350
      );
    },
    [bottomSheetRef]
  );

  useEffect(() => {
    // Workaround to refresh the bottom sheet ref initially
    setTimeout(() => {
      setSelectedProtest(protestMarkers[0]);
    }, 5);
  }, []);

  return (
    <Box flex={1}>
      <Box position="absolute" zIndex={3} top={insets.top - 10}>
        <CircularButton iconName={'arrow-right'} color="white" transparent onPress={() => navigation.goBack()} />
      </Box>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        onTouchStart={() => {
          console.log('moving...', currentSheetIndex);
          if (currentSheetIndex === 2) {
            bottomSheetRef.current?.snapTo(1);
          }
        }}
        maxZoomLevel={16}
        minZoomLevel={7}
        mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
        initialRegion={{
          latitude: 31.774979,
          longitude: 35.217181,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {protestMarkers.map((protest) => (
          <ProtestMarker
            key={protest.id}
            coordinates={protest.coordinates}
            counter={protest.counter}
            onPress={() => onMarkerPress(protest)}
          />
        ))}
      </MapView>
      <RiotMapBottomSheet
        selectedProtest={selectedProtest}
        bottomSheetRef={bottomSheetRef}
        currentSheetIndex={currentSheetIndex}
        setCurrentSheetIndex={(index: number) => setCurrrentSheetIndex(index)}
      />
    </Box>
  );
}

export default RiotMap;

const styles = StyleSheet.create({});

// <ProtestMarker
//           coordinates={{ latitude: 31.762779, longitude: 35.217181 }}
//           counter={86}
//           onPress={() => bottomSheetRef.current?.expand()}
//         />
//         <ProtestMarker
//           coordinates={{ latitude: 31.741779, longitude: 35.207181 }}
//           counter={32}
//           onPress={() => bottomSheetRef.current?.expand()}
//         />
