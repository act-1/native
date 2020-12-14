import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IEvent } from '@types/event';
import { formatLocalDay, formatShortDate, formatUpcomingDate, parseLocalDate } from '../utils/date-utils';
import { format } from 'date-fns';

export async function getEventList(): Promise<IEvent[]> {
  const querySnapshot = await firestore().collection('events').get();
  const documents = querySnapshot.docs.map(
    (doc): FirebaseFirestoreTypes.DocumentData => ({ ...doc.data(), id: doc.id })
  );

  const events = documents.map(
    (doc): IEvent => ({
      id: doc.id,
      title: doc.title,
      locationName: doc.locationName,
      thumbnail: new URL(doc.thumbnail),
      timestamp: doc.timestamp,
      content: doc.content,
      organizations: doc.organizations,
      attendingCount: doc.attendingCount,
      coordinates: doc.coordinates,
      date: format(doc.timestamp.toMillis(), 'dd/MM/yyyy'),
      time: format(doc.timestamp.toMillis(), 'HH:mm'),
      upcomingDate: formatUpcomingDate(doc.timestamp.toDate()),
      shortDate: formatShortDate(doc.timestamp.toDate()),
      localDay: formatLocalDay(doc.timestamp.toDate()),
    })
  );
  console.log('EE', events);
  return events;
}
