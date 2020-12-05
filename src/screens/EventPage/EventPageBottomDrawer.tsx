import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Box, Text, Button } from '../../components';

function EventPageBottomDrawer() {
  const insets = useSafeAreaInsets();

  return (
    <Box
      position="absolute"
      bottom={0}
      width="100%"
      height={100}
      backgroundColor="dimmedBackground"
      paddingHorizontal="l"
      paddingVertical="m"
      shadowColor="primaryText"
      shadowOpacity={1}
      shadowOffset={{ width: 0, height: 5 }}
      shadowRadius={5}
      elevation={2}
      style={{ paddingBottom: insets.bottom }}
    >
      <Box flexDirection="row" justifyContent="space-around">
        <Button title="אני אהיה שם" variant="attention" style={{ flex: 2 }} />
        <Button title="שיתוף" variant="default" style={{ marginHorizontal: 8 }} />
        <Button variant="default" style={{ flex: 0.5 }} icon={<Icon name="bell" color="#000" size={20} />} />
      </Box>
    </Box>
  );
}

export default EventPageBottomDrawer;
