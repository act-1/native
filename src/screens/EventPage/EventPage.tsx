import React from 'react';
import { StyleSheet, StatusBar, Image, SafeAreaView } from 'react-native';
import { Box, Text } from '../../components';

function EventPage() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#7254c8" />
      <Image style={styles.eventThumb} source={require('../../components/EventBox/event-thumb.jpg')} />
      <Box>
        <Text style={{ writingDirection: 'rtl' }} variant="largeTitle">
          באנו חושך לגרש - הפגנת ענק בבלפור
        </Text>
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
