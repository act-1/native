import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import mapStyle from '@utils/mapStyle.json';

import ProtestMarker from '@screens/RiotMap/Markers/ProtestMarker';
import ReportMarker from '@screens/RiotMap/Markers/ReportMarker';

export default function OnboardingMap() {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ height: 152.5, width: '100%', marginBottom: 12 }}
        pitchEnabled={false}
        zoomEnabled={false}
        cacheEnabled={true}
        scrollEnabled={false}
        customMapStyle={mapStyle}
        mapPadding={{ right: -100, left: -100 }}
        initialRegion={{
          latitude: 31.775567,
          longitude: 35.217771,
          latitudeDelta: 0.0036,
          longitudeDelta: 0.00421,
        }}
      >
        <ProtestMarker coordinates={{ latitude: 31.775302, longitude: 35.21766 }} counter={432} displayed={true} />
        <ReportMarker reportType="general" coordinates={{ latitude: 31.774676, longitude: 35.215251 }} displayed={true} />
        <ReportMarker reportType="policeViolence" coordinates={{ latitude: 31.773956, longitude: 35.219077 }} displayed={true} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 160,
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 12,
  },
});
