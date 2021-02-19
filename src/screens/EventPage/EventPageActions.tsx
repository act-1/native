import React from 'react';
import { Box, CircularButton } from '../../components';
import { useNavigation } from '@react-navigation/native';

function LocationActions({ eventStatus, isAttending, attendEvent }) {
  const navigation = useNavigation();

  let buttons = null;

  if (eventStatus === 'upcoming') {
    buttons = (
      <>
        <CircularButton iconName="check" color={isAttending ? 'green' : 'grey'} text="אישור הגעה" onPress={attendEvent} />
        <CircularButton iconName="share" color="blue" text="הזמנת חברים" />
      </>
    );
  }

  if (eventStatus === 'live') {
    buttons = (
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
    );
  }

  if (eventStatus === 'past') {
    buttons = (
      <>
        <CircularButton iconName="image" color="red" text="גלריית תמונות" />
      </>
    );
  }

  return (
    <Box flexDirection="row" justifyContent="space-evenly" backgroundColor="mainBackground" marginBottom="l">
      {buttons}
    </Box>
  );
}

export default LocationActions;
