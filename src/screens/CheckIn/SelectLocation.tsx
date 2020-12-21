import React from 'react';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';

function SelectLocation() {
  return (
    <Box flex={1} width="100%">
      <Box alignItems="center" justifyContent="center" marginTop="xl" paddingHorizontal="m">
        <Text variant="extraLargeTitle" color="lightText" marginBottom="s">
          יצאתן להפגין? עשו צ׳ק אין!
        </Text>
        <Text variant="text" textAlign="center" color="lightText" marginBottom="s">
          ביחד נראה לכל הארץ כמה המחאה שלנו גדולה.
        </Text>
        <Text variant="smallText" textAlign="center" color="lightText" paddingHorizontal="xl">
          על מנת לראות את ההפגנות באיזורך, יש לאשר שימוש בשירותי המיקום.
        </Text>

        <RoundedButton text="בדבגדשבגדב" color="blue" />
      </Box>
    </Box>
  );
}

export default SelectLocation;
