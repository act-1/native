import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, CircularButton } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import mapStyle from '@utils/mapStyle.json';
import { RiotMapProps } from '@types/navigation';

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
        minZoomLevel={9}
        mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
        initialRegion={{
          latitude: 31.774979,
          longitude: 35.217181,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
    </Box>
  );
}

export default RiotMap;

const styles = StyleSheet.create({});
