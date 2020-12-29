import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { addCheckInEntry } from '../../services/liveFeed';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { LocationScreenProps } from '@types/navigation';
import database from '@react-native-firebase/database';

function LocationPage({ navigation, route }: LocationScreenProps) {
  const store = useStore();
  const [balfur, setBalfur] = useState('3,415');

  useEffect(() => {
    const balfurCount = database().ref('balfurCount');

    balfurCount.on('value', (snapshot) => {
      setBalfur(snapshot.val().toLocaleString());
      console.log('Balfur count: ', snapshot.val());
    });

    return () => {
      balfurCount.off();
    };
  }, []);

  const confirmCheckIn = () => {
    Alert.alert('צ׳ק אין', 'האם לעשות צ׳ק אין להפגנה?', [
      {
        text: 'לא עכשיו',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'אישור',
        onPress: () => addCheckInEntry(),
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
          latitude: 31.7749882,
          longitude: 35.2197916,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Box alignItems="center" justifyContent="center" paddingHorizontal="m" style={{ marginTop: -60 }}>
        <Box shadowOpacity={0.5} shadowOffset={{ width: 0, height: 0 }} shadowRadius={3}>
          <Image source={require('../../assets/icons/map-pin-circular.png')} style={styles.mapPin} />
        </Box>
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          כיכר פריז
        </Text>
        <Text variant="largeTitle" fontWeight="500" color="lightText" marginBottom="xm">
          {balfur} עכשיו בהפגנה
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
            <RoundedButton text="העלאת תמונה" size="huge" icon={require('@assets/icons/camera.png')} style={{ flex: 1 }} />
            <Box flex={0.075} />
            <RoundedButton text="גלריית הפגנה" size="huge" icon={require('@assets/icons/gallery.png')} style={{ flex: 1 }} />
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
