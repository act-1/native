import React from 'react';
import { Box, Text, LocationBox } from '../../components';

function LiveCheckIns() {
  return (
    <Box>
      <Box marginBottom="m">
        <LocationBox name="כיכר פריז" address="ירושלים" />
        <LocationBox name="כיכר רבין" address="תל אביב" />
        <LocationBox name="בית הנאשם" address="קיסריה" />
        <LocationBox name="צומת פרדסיה" address="פרדסיה" />
      </Box>
      <Text variant="appLink" textAlign="center">
        לרשימה המלאה{' >'}
      </Text>
    </Box>
  );
}

export default LiveCheckIns;
