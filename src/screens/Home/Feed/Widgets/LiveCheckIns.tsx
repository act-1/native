import React, { useEffect, useState } from 'react';
import { Box, Text, LocationBox } from '../../../../components';
import database from '@react-native-firebase/database';

function LiveCheckIns() {
  const [balfur, setBalfur] = useState('3,415');

  useEffect(() => {
    const balfurCount = database().ref('balfurCount');

    balfurCount.on('value', (snapshot) => {
      setBalfur(snapshot.val().toLocaleString());
    });

    return () => {
      balfurCount.off();
    };
  }, []);

  return (
    <Box>
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" paddingHorizontal="m" marginBottom="m">
        <Text variant="largeTitle" color="lightText" fontWeight="500">
          עכשיו בהפגנה
        </Text>
        <Box backgroundColor="important" paddingHorizontal="xm" paddingVertical="xs" borderRadius={25}>
          <Text color="mainBackground" fontFamily="AtlasDL3.1AAA-Medium">
            LIVE
          </Text>
        </Box>
      </Box>
      <Box marginBottom="m">
        <LocationBox name="כיכר פריז" address="ירושלים" counter={balfur} />
        <LocationBox name="כיכר רבין" address="תל אביב" counter={'1,422'} />
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
