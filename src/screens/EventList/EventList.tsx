import React from 'react';
import { StatusBar, Image, SectionList, SafeAreaView } from 'react-native';
import { Box, Text, EventBox } from '../../components';

const thumb = require('../../components/EventBox/event-thumb.jpg');
const imageUrl = new URL(Image.resolveAssetSource(thumb).uri);

const DATA = [
  {
    title: { day: 'היום', date: '5 בדצמבר' },
    data: [
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
    ],
  },
  {
    title: { day: 'מחר', date: '6 בדצמבר' },
    data: [
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
      {
        title: 'באנו חושך לגרש - הפגנת ענק בבלפור',
        dateTime: 'שבת בשעה 19:00',
        location: 'כיכר פריז, ירושלים',
        thumbnailUrl: imageUrl,
        key: Math.random(),
      },
    ],
  },
];

function EventList({ navigation }) {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Box justifyContent="center" height="100%">
        <SectionList
          sections={DATA}
          renderItem={({ item }) => <EventBox {...item} onPress={() => navigation.navigate('EventPage')} />}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <Box marginTop="m" marginLeft="m">
              <Text fontSize={22} textAlign="left" fontFamily="Rubik-Medium">
                {title.day}
              </Text>
              <Text fontSize={16} textAlign="left" color="lightText" fontFamily="Rubik-Regular">
                {title.date}
              </Text>
            </Box>
          )}
          style={{}}
        />
      </Box>
    </SafeAreaView>
  );
}

export default EventList;
