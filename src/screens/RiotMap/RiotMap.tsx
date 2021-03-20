import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { Box, Text, CircularButton } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, Region } from 'react-native-maps';
import ProtestMarker from './ProtestMarker';
import RegionMarker from './RegionMarker';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import RiotMapBottomSheet from './RiotMapBottomSheet';
import { MarkerUnits } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

function RiotMap({ navigation }: RiotMapProps) {
  const { mapStore } = useStore();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [currentSheetIndex, setCurrrentSheetIndex] = useState(0);
  const [selectedProtest, setSelectedProtest] = useState({});
  const [mapZoom, setMapZoom] = useState(0);

  const onMarkerPress = useCallback(
    (protest: any) => {
      setSelectedProtest(protest);

      // Workaround to delay the bottom sheet expansion after the region animation
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 300);

      mapRef.current?.animateToRegion(
        {
          latitude: protest.latitude,
          longitude: protest.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        350
      );
    },
    [bottomSheetRef]
  );

  const onMapMoveCompletion = (region: Region) => {
    // Update zoom state for region markers only when there are > 4 live protests
    // if (mapStore.protests.length > 4) setMapZoom(region.latitudeDelta);
  };

  // useEffect(() => {
  //   // Workaround to refresh the bottom sheet ref initially
  //   if (mapStore.protests.length > 0) {
  //     setTimeout(() => {
  //       setSelectedProtest(mapStore.protests[0]);
  //     }, 5);
  //   }
  // }, []);

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
        onRegionChangeComplete={onMapMoveCompletion}
        mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
        initialRegion={{
          latitude: 31.774979,
          longitude: 35.217181,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {mapStore.protests.map((protest: Protest) => (
          <ProtestMarker
            key={protest.id}
            coordinates={{ latitude: protest.latitude, longitude: protest.longitude }}
            counter={protest.counter}
            onPress={() => onMarkerPress(protest)}
            displayed={mapZoom < 1.35}
          />
        ))}
        <RegionMarker displayed={mapZoom > 1.35} coordinates={{ latitude: 31.774979, longitude: 35.217181 }} counter={200} />
        <RegionMarker displayed={mapZoom > 1.35} coordinates={{ latitude: 32.072387, longitude: 34.7817674 }} counter={568} />
      </MapView>
      <RiotMapBottomSheet
        protest={selectedProtest}
        bottomSheetRef={bottomSheetRef}
        currentSheetIndex={currentSheetIndex}
        setCurrentSheetIndex={(index: number) => setCurrrentSheetIndex(index)}
      />
    </Box>
  );
}

export default observer(RiotMap);

const styles = StyleSheet.create({});
