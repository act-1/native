import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import ProtestMarker from './ProtestMarker';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

function RiotMap({ navigation }: RiotMapProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1}>
      <Box position="absolute" zIndex={3} top={insets.top - 10}>
        <CircularButton iconName={'arrow-right'} color="white" transparent onPress={() => navigation.goBack()} />
      </Box>
      <MapView
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
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
        <ProtestMarker coordinates={{ latitude: 31.774979, longitude: 35.217181 }} counter={432} />
        <ProtestMarker coordinates={{ latitude: 31.762779, longitude: 35.217181 }} counter={86} />
        <ProtestMarker coordinates={{ latitude: 31.741779, longitude: 35.207181 }} counter={32} />
      </MapView>
    </Box>
  );
}

export default RiotMap;

const styles = StyleSheet.create({});
