import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';
import EventPageDetail from './EventPageDetail';

function EventPage() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%' }}>
        <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
        <Image style={styles.eventThumb} source={require('../../components/EventBox/event-thumb.jpg')} />
        <Box padding="m">
          <Text style={{ writingDirection: 'rtl' }} variant="largeTitle" marginBottom="m" textAlign="center">
            באנו חושך לגרש - הפגנת ענק בבלפור
          </Text>
          <Box flexDirection="row" justifyContent="space-evenly">
            <EventPageDetail text="כיכר פריז, ירושלים" iconName="map-pin" />
            <EventPageDetail text="יום שבת בשעה 19:00" iconName="clock" />
          </Box>
        </Box>
      </ScrollView>
      <Box
        position="absolute"
        bottom={0}
        width="100%"
        height={60}
        backgroundColor="drawerBackground"
        shadowColor="primaryText"
        shadowOpacity={1}
        shadowOffset={{ width: 0, height: 5 }}
        shadowRadius={5}
        elevation={2}
        style={{ paddingBottom: insets.bottom }}
      >
        <Text>hi</Text>
      </Box>
    </SafeAreaView>
  );
}

export default EventPage;

const styles = StyleSheet.create({
  eventThumb: {
    width: '100%',
    height: 200,
  },
});
