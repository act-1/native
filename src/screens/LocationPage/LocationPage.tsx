import React from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { addCheckInEntry } from '../../api/liveFeed';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';

function LocationPage({ navigation, route }: LocationScreenProps) {
  const store = useStore();

  const confirmCheckIn = () => {
    Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
      {
        text: 'לא עכשיו',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'אישור',
        onPress: () => console.log('Ask me later pressed'),
      },
    ]);
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
        <Text variant="largeTitle" fontWeight="500" color="lightText" marginBottom="xm">
          85 עכשיו בהפגנה
        </Text>

        <Box width="100%" paddingHorizontal="xm">
          <RoundedButton
            text="צ׳ק אין"
            size="huge"
            icon={require('@assets/icons/location-icon.png')}
            style={{ marginBottom: 12 }}
            onPress={() => confirmCheckIn()}
          />
          <RoundedButton text="הזמנת חברים" size="huge" icon={require('@assets/icons/hands-together.png')} />

          <Box flexDirection="row" width="100%" marginTop="m">
            <RoundedButton text="גלריית הפגנה" size="huge" icon={require('@assets/icons/camera.png')} style={{ flex: 1 }} />
            <Box flex={0.075} />
            <RoundedButton text="העלאת תמונה" size="huge" icon={require('@assets/icons/gallery.png')} style={{ flex: 1 }} />
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
