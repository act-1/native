import React from 'react';
import { Box, CircularButton } from '../../components';
import { useNavigation } from '@react-navigation/native';

function LocationActions({ eventMode, isAttending, attendEvent }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="mainBackground" marginBottom="l">
      {eventMode === 'live' ? (
        <>
          <CircularButton
            iconName="map-pin"
            color="red"
            text="צ׳ק אין"
            onPress={() => navigation.navigate('ActionModal', { screen: 'ActionScreen' })}
            style={{ paddingRight: 1.25 }}
          />
          <CircularButton
            iconName="rss"
            color="orange"
            text="פיד הפגנה"
            onPress={() => navigation.navigate('ActionModal', { screen: 'ActionScreen' })}
            style={{ paddingRight: 1.25 }}
          />
        </>
      ) : (
        <>
          <CircularButton iconName="check" color={isAttending ? 'green' : 'grey'} text="אישור הגעה" onPress={attendEvent} />
          <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
        </>
      )}
    </Box>
  );
}

export default LocationActions;