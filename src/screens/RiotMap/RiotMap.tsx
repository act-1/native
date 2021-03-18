import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import { Box, Text, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import ProtestMarker from './ProtestMarker';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';

import BottomSheet from '@gorhom/bottom-sheet';

const { height, width } = Dimensions.get('window');

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

function RiotMap({ navigation }: RiotMapProps) {
  const insets = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => [0, 50 + insets.bottom, '25%'], [insets.bottom]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Box flex={1}>
      <Box position="absolute" zIndex={3} top={insets.top - 10}>
        <CircularButton iconName={'arrow-right'} color="white" transparent onPress={() => navigation.goBack()} />
      </Box>
      <MapView
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        onPanDrag={() => bottomSheetRef.current?.snapTo(1)}
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
          onPress={() => bottomSheetRef.current?.expand()}
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

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={() => <LocationDetailsHandle />}
      >
        <Box flex={1} paddingVertical="xxs" paddingHorizontal="xm" style={{ backgroundColor: '#363636' }}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="baseline">
            <Box>
              <Text variant="extraLargeTitle">כיכר פריז</Text>
              <Text variant="text" marginBottom="xxs">
                ירושלים
              </Text>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Box>
  );
}

export default RiotMap;

const styles = StyleSheet.create({});

const LocationDetailsHandle = () => (
  <Box style={{ paddingHorizontal: 16, paddingVertical: 5, backgroundColor: '#363636' }}>
    <Box
      style={{
        alignSelf: 'center',
        width: 40,
        height: 5,
        borderRadius: 4,
        backgroundColor: '#696a6c',
      }}
    />
  </Box>
);
