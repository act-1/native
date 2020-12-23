import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { addCheckInEntry } from '../../api/liveFeed';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';

function LocationPage({ navigation, route }: LocationScreenProps) {
  const store = useStore();

  const checkIn = (type: string) => {
    const checkInData = {
      locationName: 'צומת פרדסיה',
      locationId: 'pardesyia',
      eventId: 'balfur-19-dec',
    };

    if (type === 'annonymous') {
      addCheckInEntry(checkInData);
    }
  };

  return (
    <Box flex={1} width="100%">
      <MapView
        style={{ height: 175, marginHorizontal: -12, marginBottom: 16 }}
        maxZoomLevel={14}
        minZoomLevel={14}
        mapPadding={{ right: -25, top: 0, bottom: 0, left: 15 }}
        initialRegion={{
          latitude: 32.305138,
          longitude: 34.9031153,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Box alignItems="center" justifyContent="center" paddingHorizontal="m" style={{ marginTop: -60 }}>
        <Image source={require('../../assets/icons/map-pin-circular.png')} style={styles.mapPin} />
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          צומת פרדסיה
        </Text>
        <Text variant="largeTitle" fontWeight="500" color="lightText" marginBottom="m">
          85 עכשיו בהפגנה
        </Text>

        <Box width="100%" paddingHorizontal="xm">
          <Box
            backgroundColor="dimmedBackground"
            height={130}
            borderRadius={4}
            alignItems="center"
            justifyContent="center"
            marginBottom="m"
          >
            <Image
              source={require('@assets/icons/location-icon.png')}
              style={{ marginBottom: 12, width: 65, height: 65 }}
            />
            <Text variant="boxTitle">צ׳ק אין</Text>
          </Box>
          <Box
            backgroundColor="dimmedBackground"
            height={130}
            borderRadius={4}
            alignItems="center"
            justifyContent="center"
          >
            <Image source={require('@assets/icons/location-icon.png')} style={{ marginBottom: 12 }} />
            <Text variant="boxTitle">צ׳ק אין</Text>
          </Box>
          <Box flexDirection="row" width="100%" marginTop="m">
            <Box
              backgroundColor="dimmedBackground"
              height={130}
              borderRadius={4}
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Image source={require('@assets/icons/location-icon.png')} style={{ marginBottom: 12 }} />
              <Text variant="boxTitle">צ׳ק אין</Text>
            </Box>
            <Box flex={0.1} />
            <Box
              backgroundColor="dimmedBackground"
              height={130}
              borderRadius={4}
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Image source={require('@assets/icons/location-icon.png')} style={{ marginBottom: 12 }} />
              <Text variant="boxTitle">צ׳ק אין</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(LocationPage);

const styles = StyleSheet.create({
  mapPin: {
    width: 75,
    height: 75,
    marginBottom: 8,
    resizeMode: 'contain',
  },
});
