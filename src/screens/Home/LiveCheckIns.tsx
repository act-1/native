import React from 'react';
import { Box, Text, LocationBox } from '../../components';

function LiveCheckIns() {
  return (
    <Box>
      <Box marginBottom="m">
        <LocationBox name="כיכר פריז" address="ירושלים" counter={'3,412'} />
        <LocationBox name="כיכר רבין" address="תל אביב" counter={'1,421'} />
        <LocationBox name="בית הנאשם" address="קיסריה" counter={'981'} />
        <LocationBox name="צומת פרדסיה" address="פרדסיה" counter={'59'} />
      </Box>
      <Text variant="appLink" textAlign="center">
        לרשימה המלאה{' >'}
      </Text>
    </Box>
  );
}

export default LiveCheckIns;
