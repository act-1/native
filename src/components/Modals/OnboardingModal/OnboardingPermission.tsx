import React, { useState, useRef } from 'react';
import { Box, Text } from '../..';
import { RoundedButton } from '../../Buttons';
import MapView from 'react-native-maps';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { requestLocationPermission } from '@utils/location-utils';

import ProtestMarker from '@screens/RiotMap/Markers/ProtestMarker';
import ReportMarker from '@screens/RiotMap/Markers/ReportMarker';

import Ivrita from 'ivrita';

function OnboardingPermission({ finishOnboarding }: { finishOnboarding: () => void }) {
  const { userStore } = useStore();
  const { pronoun } = userStore.userData;

  const requestLocation = async () => {
    try {
      await requestLocationPermission();
      userStore.initUserLocation();
      setTimeout(() => {
        finishOnboarding();
      }, 300);
    } catch (err) {
      throw err;
    }
  };

  return (
    <Box flex={1} style={{ alignItems: 'center' }}>
      <MapView
        style={{ height: 150, width: '100%', borderRadius: 12, marginBottom: 12 }}
        pitchEnabled={false}
        zoomEnabled={false}
        cacheEnabled={true}
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
      <Text variant="largeTitle" color="primaryColor" marginBottom="s" textAlign="center" maxFontSizeMultiplier={1.15}>
        מצב הפגנה
      </Text>
      <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
        {Ivrita.genderize('על מנת להכנס למצב הפגנה יש להפעיל את שירותי המיקום של מכשירכם.ן.', Ivrita[pronoun])}
      </Text>
      <Text variant="text" marginBottom="xm" textAlign="center" maxFontSizeMultiplier={1.15}>
        {Ivrita.genderize('המיקום נשאר על גבי מכשירכם.ן בלבד ולא עובר אלינו.', Ivrita[pronoun])}
      </Text>
      <RoundedButton text="הפעלת שירותי מיקום" onPress={() => requestLocation()} color="yellow" style={{ marginBottom: 8 }} />
      <RoundedButton style={{ opacity: 0.5 }} color="grey" text="לא עכשיו" onPress={() => finishOnboarding()} />
    </Box>
  );
}

export default observer(OnboardingPermission);
