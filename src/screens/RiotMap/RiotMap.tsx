import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Animated, Dimensions, Button } from 'react-native';
import { Box, Text, CircularButton, StatusBarBlurBackground } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Region } from 'react-native-maps';
import ProtestMarker from './Markers/ProtestMarker';
import RegionMarker from './RegionMarker';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';
import BottomSheet from '@gorhom/bottom-sheet';
import RiotMapBottomSheet from './RiotMapBottomSheet';

const { height, width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

function RiotMap({ navigation, route }: RiotMapProps) {
  const { mapStore } = useStore();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const [currentSheetIndex, setCurrrentSheetIndex] = useState(0);
  const [selectedProtest, setSelectedProtest] = useState({});
  const [mapZoom, setMapZoom] = useState(0);

  const onMarkerPress = useCallback(
    (protest: any) => {
      if (protest !== selectedProtest) {
        setSelectedProtest(protest);
      }

      // if (currentSheetIndex !== 2) {
      // Workaround to delay the bottom sheet expansion after the region animation
      setTimeout(() => {
        bottomSheetRef.current?.expand();
      }, 300);
      // }

      mapRef.current?.animateToRegion(
        {
          latitude: protest.latitude,
          longitude: protest.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1 * (width / height),
        },
        350
      );
    },
    [bottomSheetRef]
  );

  const onMapMoveCompletion = (region: Region) => {
    // Update zoom state for region markers only when there are > 4 live protests
    setMapZoom(region.latitudeDelta);
  };

  useEffect(() => {
    if (route.params?.initialCoordinates) {
      mapRef.current?.animateToRegion(
        {
          ...route.params.initialCoordinates,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        500
      );
    }
  }, [route.params]);

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
      <StatusBarBlurBackground blurType="dark" />
      <Box zIndex={15} position="absolute" top={insets.top + 7.5} left={7.5} opacity={0.97}>
        <CircularButton iconName={'x'} color="grey" size="large" onPress={() => navigation.goBack()} />
      </Box>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        onTouchStart={() => {
          if (currentSheetIndex === 2) {
            bottomSheetRef.current?.snapTo(1);
          }
        }}
        maxZoomLevel={16}
        minZoomLevel={7}
        onRegionChangeComplete={onMapMoveCompletion}
        mapPadding={{ right: -35, top: 0, bottom: -insets.top + insets.bottom, left: 5 }}
        initialRegion={{
          latitude: 31.774979,
          longitude: 35.217181,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {mapStore.protests.map((protest: Protest) => {
          if (!protest.id || !protest.latitude || !protest.longitude) return null;
          return (
            <ProtestMarker
              key={protest.id}
              coordinates={{ latitude: protest.latitude, longitude: protest.longitude }}
              counter={protest.counter}
              onPress={() => onMarkerPress(protest)}
              displayed={mapZoom < 1.35}
            />
          );
        })}
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
