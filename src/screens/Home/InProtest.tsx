import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import MapView from 'react-native-maps';
import EventPagePictures from '../EventPage/EventPagePictures';

import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Feather';

const MapCounterView = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === 'android') {
    return <Box style={[styles.mapCounter, { opacity: 0.8, backgroundColor: '#000', elevation: 2 }]}>{children}</Box>;
  } else {
    return (
      <BlurView blurType="extraDark" style={[styles.mapCounter, { width: 75, margin: 12.5 }]}>
        {children}
      </BlurView>
    );
  }
};

function InProtest({ event }) {
  const { userStore, eventStore, liveStore } = useStore();

  return (
    <>
      <Box marginHorizontal="m">
        {event && (
          <MapView
            style={{
              height: 275,
              borderRadius: 8,
            }}
            maxZoomLevel={16}
            minZoomLevel={14}
            mapPadding={{ right: -40, top: 0, bottom: 0, left: 0 }}
            initialRegion={{
              latitude: event?.coordinates._latitude,
              longitude: event?.coordinates._longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapCounterView>
              <Text variant="boxTitle" fontSize={18} color="primaryColor" textAlign="center">
                82
              </Text>
              <Text variant="smallText" textAlign="center" fontWeight="600">
                באיזורך
              </Text>
            </MapCounterView>
          </MapView>
        )}
        <Box
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          paddingVertical="m"
          marginTop="m"
          backgroundColor="seperator"
          borderRadius={8}
        >
          <Box alignItems="center">
            <Icon name="message-circle" size={36} color="white" style={{ marginBottom: 6 }} />
            <Text variant="smallText">צ׳אט איזורי</Text>
          </Box>
          <Box alignItems="center">
            <Icon name="camera" size={36} color="white" style={{ marginBottom: 6 }} />
            <Text variant="smallText">צילום תמונה</Text>
          </Box>
          <Box alignItems="center">
            <Icon name="share" size={36} color="white" style={{ marginBottom: 6 }} />
            <Text variant="smallText">הזמנת חברים</Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop="m">{event && <EventPagePictures event={event} size="small" />}</Box>
    </>
  );
}

export default observer(InProtest);

const styles = StyleSheet.create({
  mapCounter: {
    padding: 8,
    borderRadius: 8,
  },
});
