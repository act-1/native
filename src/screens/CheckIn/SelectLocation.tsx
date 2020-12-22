import React from 'react';
import { SelectLocationScreenProps } from '@types/navigation';
import { Box, Text, LocationBox } from '../../components';
import { RoundedButton } from '../../components/Buttons';

function SelectLocation({ navigation }: SelectLocationScreenProps) {
  return (
    <Box flex={1} width="100%">
      <Box alignItems="center" justifyContent="center" marginTop="xl">
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          יצאתן להפגין? עשו צ׳ק אין!
        </Text>
        <Text variant="text" textAlign="center" color="lightText" marginBottom="xm">
          ביחד נראה לכל הארץ כמה המחאה שלנו גדולה.
        </Text>
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl" marginBottom="xm">
          על מנת לראות את ההפגנות באיזורך, יש לאשר שימוש בשירותי המיקום.
        </Text>

        <RoundedButton
          text="איתור הפגנות באיזורי"
          onPress={() => navigation.navigate('CheckInPage')}
          color="blue"
          textStyle={{ fontWeight: 'bold' }}
        />

        <LocationBox name="צומת פרדסיה" address="ביתחי" onPress={() => navigation.navigate('CheckInPage')} />
      </Box>
    </Box>
  );
}

export default SelectLocation;
