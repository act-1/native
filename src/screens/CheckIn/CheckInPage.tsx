import React from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { addCheckInEntry } from '../../api/liveFeed';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { CheckInPageProps } from '@types/navigation';

function CheckInPage({ navigation, route }: CheckInPageProps) {
  const store = useStore();

  const checkIn = (type: string) => {
    const checkInData = {
      locationName: 'צומת פרדסיה',
      locationId: route.params.locationId,
      // coordinates: [32.305138, ]
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
        <RoundedButton
          text="צ׳ק אין אנונימי"
          color="grey"
          style={{ marginBottom: 8 }}
          onPress={() => checkIn('annonymous')}
        />
        <Text variant="text" marginBottom="xs">
          רוצים לעשות צ׳ק אין עם תמונה?
        </Text>
        <Text variant="text" marginBottom="m">
          התחברו אל Act1:
        </Text>
        <RoundedButton text="התחברות דרך פייסבוק" color="blue" style={{ marginBottom: 4 }} />
        <RoundedButton text="התחברות דרך גוגל" color="yellow" style={{ marginBottom: 4 }} />
        <RoundedButton text="התחברות דרך אפל" color="black" style={{ marginBottom: 4 }} />
      </Box>
    </Box>
  );
}

export default observer(CheckInPage);

const styles = StyleSheet.create({
  mapPin: {
    width: 75,
    height: 75,
    marginBottom: 8,
    resizeMode: 'contain',
  },
});
