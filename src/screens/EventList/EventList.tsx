import React, { useState, useEffect } from 'react';
import { StatusBar, Image, SectionList, SafeAreaView } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Box, Text, EventBox } from '../../components';
import { formatLocalDay, formatShortDate, formatUpcomingDate, parseLocalDate } from '../../utils/date-utils';
import { format, compareAsc } from 'date-fns';

// TODO: Add typings
async function getEventList() {
  const querySnapshot = await firestore().collection('events').get();
  const documents = querySnapshot.docs.map((doc) => doc.data());

  const events = documents.map((doc) => ({
    ...doc,
    thumbnail: new URL(doc.thumbnail),
    date: format(doc.timestamp.toMillis(), 'dd/MM/yyyy'),
    localDay: formatLocalDay(doc.timestamp.toDate()),
    time: format(doc.timestamp.toMillis(), 'HH:mm'),
  }));
  return events;
}

function formatEventsForSectionList(events: [IEvent]) {
  let sections: [{ title: string; subtitle: string; data: [IEvent] }];
  const eventsByDates: { [key: string]: [IEvent] } = {};

  events.forEach((event) => {
    if (!eventsByDates[event.date]) {
      eventsByDates[event.date] = [event];
    } else {
      eventsByDates[event.date].push(event);
    }
  });

  sections = Object.keys(eventsByDates).map((date) => ({
    title: formatUpcomingDate(parseLocalDate(date)),
    subtitle: formatShortDate(parseLocalDate(date)),
    data: eventsByDates[date],
  }));

  return sections;
}

// const dates = Array.from(new Set(events.map((item: IEvent) => item.date))).sort((a, b) =>
//   compareAsc(new Date(a), new Date(b))
// );
// const eventsByDates = events.map()

// eventSections = dates.map((date) => eventSections.push());}

function EventList({ navigation }) {
  const [eventList, setEventList] = useState<any>([]);

  useEffect(() => {
    getEventList()
      .then((docs) => setEventList(formatEventsForSectionList(docs)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#7254c8" />
      <Box justifyContent="center" height="100%">
        <SectionList
          sections={eventList}
          renderItem={({ item }) => <EventBox {...item} onPress={() => navigation.navigate('EventPage')} />}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title, subtitle } }) => (
            <Box marginTop="m" marginLeft="m">
              <Text fontSize={22} textAlign="left" fontFamily="Rubik-Medium">
                {title}
              </Text>
              <Text fontSize={16} textAlign="left" color="lightText" fontFamily="Rubik-Regular">
                {subtitle}
              </Text>
            </Box>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}

export default EventList;
