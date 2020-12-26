import React from 'react';
import { Box, Text, LocationBox } from '../../components';

function LiveCheckIns() {
  return (
    <Box flex={1}>
      <LocationBox name="כיכר פריז" address="ירושלים" />
      <LocationBox name="כיכר רבין" address="תל אביב" />
      <LocationBox name="בית הנאשם" address="קיסריה" />
      <LocationBox name="צומת פרדסיה" address="פרדסיה" />
      <Text variant="appLink" textAlign="center">לרשימה המלאה ></Text>
    </Box>
  );
}

export default LiveCheckIns;
