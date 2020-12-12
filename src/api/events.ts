import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { formatLocalDay } from '../utils/date-utils';
import { format } from 'date-fns';

export type IEvent = {
  id: string;
  title: string;
  locationName: string;
  date: string;
  localDay: string;
  time: string;
  thumbnail: URL;
};

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
      date: format(doc.timestamp.toMillis(), 'dd/MM/yyyy'),
      time: format(doc.timestamp.toMillis(), 'HH:mm'),
      localDay: formatLocalDay(doc.timestamp.toDate()),
    })
  );
  console.log('EE', events);
  return events;
}
