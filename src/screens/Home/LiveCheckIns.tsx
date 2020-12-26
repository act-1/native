import React, { useEffect, useState } from 'react';
import { Box, Text, LocationBox } from '../../components';
import database from '@react-native-firebase/database';

function LiveCheckIns() {
  const [balfur, setBalfur] = useState('3,415');

  useEffect(() => {
    const balfurCount = database().ref('balfurCount');

    balfurCount.on('value', (snapshot) => {
      setBalfur(snapshot.val().toLocaleString());
      console.log('Balfur count: ', snapshot.val());
    });

    return () => {
      balfurCount.off();
    };
  }, []);

  return (
    <Box>
      <Box marginBottom="m">
        <LocationBox name="כיכר פריז" address="ירושלים" counter={balfur} />
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
