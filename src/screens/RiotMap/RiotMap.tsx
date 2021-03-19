import React, { useState, useRef } from 'react';
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

function RiotMap({ navigation }: RiotMapProps) {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [currentSheetIndex, setCurrrentSheetIndex] = useState(0);

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
        <ProtestMarker
          coordinates={{ latitude: 31.774979, longitude: 35.217181 }}
          counter={432}
          onPress={() => {
            bottomSheetRef.current?.expand();
            mapRef.current?.animateToRegion({
              latitude: 31.774979,
              longitude: 35.217181,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
          }}
          selected={true}
        />
        <ProtestMarker
          coordinates={{ latitude: 31.762779, longitude: 35.217181 }}
          counter={86}
          onPress={() => bottomSheetRef.current?.expand()}
        />
        <ProtestMarker
          coordinates={{ latitude: 31.741779, longitude: 35.207181 }}
          counter={32}
          onPress={() => bottomSheetRef.current?.expand()}
        />
      </MapView>
      <RiotMapBottomSheet
        bottomSheetRef={bottomSheetRef}
        currentSheetIndex={currentSheetIndex}
        setCurrentSheetIndex={(index: number) => setCurrrentSheetIndex(index)}
      />
    </Box>
  );
}

export default RiotMap;

const styles = StyleSheet.create({});
