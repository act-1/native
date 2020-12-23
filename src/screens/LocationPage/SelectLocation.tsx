import React, { useState } from 'react';
import { Image } from 'react-native';
import { openSettings } from 'react-native-permissions';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox, EventBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  const { userStore } = useStore();
  const { userLocationPermission, userCurrentPosition } = userStore;
  const [locations, setLocations] = useState([]);

  const requestLocation = async () => {
    try {
      await userStore.getUserCoordinates();
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

        {userLocationPermission === 'blocked' && (
          <>
            <Box backgroundColor="importantLight" width={250} padding="xm" paddingBottom="s" marginBottom="m" borderRadius={3}>
              <Text variant="importantText" textAlign="center" marginBottom="xm">
                שירותי המיקום מנוטרלים.
              </Text>
              <Text variant="importantText" fontWeight="500" textAlign="center" marginBottom="xm">
                על מנת למצוא הפגנות באיזורכם, יש לאפשר שימוש בשירותי המיקום בהגדרות המכשיר.
              </Text>
            </Box>

            <RoundedButton
              text="פתיחת הגדרות המכשיר"
              onPress={() => openSettings()}
              color="grey"
              style={{ marginBottom: 8 }}
              textStyle={{ fontWeight: 'bold' }}
            />
          </>
        )}

        {userLocationPermission !== 'granted' || userCurrentPosition.length === 0 ? (
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

export default observer(SelectLocation);
