import React, { useState } from 'react';
import { Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { UrlTile } from 'react-native-maps';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const [locations, setLocations] = useState([]);

  const requestLocation = async () => {
    try {
      const status = await Geolocation.requestAuthorization('whenInUse');
      console.log(status);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box flex={1} width="100%">
      <Box alignItems="center" justifyContent="center" marginTop="xl">
        <Image source={require('@assets/illustrations/power-deluxe.png')} style={{ marginBottom: 16 }} />
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          יצאתן להפגין? עשו צ׳ק אין!
        </Text>
        <Text variant="text" textAlign="center" color="lightText" marginBottom="xm">
          ביחד נראה לכל הארץ כמה המחאה שלנו גדולה.
        </Text>
        {locations.length === 0 ? (
          <>
            <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
              על מנת לראות את ההפגנות באיזורך, יש לאשר שימוש בשירותי המיקום.
            </Text>

            <RoundedButton
              text="איתור הפגנות באיזורי"
              onPress={() => requestLocation()}
              color="blue"
              textStyle={{ fontWeight: 'bold' }}
            />
          </>
        ) : (
          <Box marginTop="m" width="100%">
            <EventBox
              time="18:00"
              localDay="יום ראשון"
              locationName="בלפור"
              title="טקס פרישה לדורון ידיד"
              thumbnail={
                new URL('https://res.cloudinary.com/onekm/image/upload/v1608277882/event_thumbs/balfur-19-dec_oi3uhh.jpg')
              }
              onPress={() => navigation.navigate('LocationPage', { locationId: 'pardesiya ' })}
            />
            <LocationBox
              name="צומת פרדסיה"
              address="בית חי"
              onPress={() => navigation.navigate('LocationPage', { locationId: 'pardesiya ' })}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default SelectLocation;
