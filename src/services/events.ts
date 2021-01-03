import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import analytics from '@react-native-firebase/analytics';
import * as geofirestore from 'geofirestore';
import { IEvent } from '@types/event';
import { formatLocalDay, formatShortDate, formatUpcomingDate } from '../utils/date-utils';
import { format } from 'date-fns';

// Create a GeoFirestore reference
const GeoFirestore = geofirestore.initializeApp(firestore());

// Create a GeoCollection reference
const geocollection = GeoFirestore.collection('events');

export async function getEventList(): Promise<IEvent[]> {
  const now = new Date();
  now.setHours(now.getHours() - 6); // So the event won't disappear while it's ongoing

  const querySnapshot = await geocollection.where('startDate', '>', now).get();

  const documents = querySnapshot.docs.map((doc): FirebaseFirestoreTypes.DocumentData => ({ ...doc.data(), id: doc.id }));

  const events = documents.map(
    (doc): IEvent => ({
      id: doc.id,
      title: doc.title,
      locationName: doc.locationName,
      thumbnail: new URL(doc.thumbnail),
      content: doc.content,
      organizations: doc.organizations,
      attendingCount: doc.attendingCount,
      coordinates: doc.coordinates,
      startDate: doc.startDate,
      endDate: doc.endDate,
      date: format(doc.startDate.toMillis(), 'dd/MM/yyyy'),
      time: format(doc.startDate.toMillis(), 'HH:mm'),
      upcomingDate: formatUpcomingDate(doc.startDate.toDate()),
      shortDate: formatShortDate(doc.startDate.toDate()),
      localDay: formatLocalDay(doc.startDate.toDate()),
    })
  );

  return events;
}

export async function attendEvent({
  eventId,
  eventDate,
}: {
  eventId: string;
  eventDate: FirebaseFirestoreTypes.Timestamp;
}): Promise<{ attended: boolean }> {
  try {
    const result = await functions().httpsCallable('attendEvent')({ eventId, eventDate });
    if (result.data.ok) {
      await analytics().logEvent('attend_event', { event_id: eventId });
      return { attended: true };
    }
    throw new Error('Unexpected error.');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function attendenceRemoval({ eventId }: { eventId: string }): Promise<{ removed: boolean }> {
  try {
    const result = await functions().httpsCallable('unattendEvent')({ eventId });
    if (result.data.ok) {
      await analytics().logEvent('unattend_event', { event_id: eventId });
      return { removed: true };
    }
    throw new Error('Unexpected error.');
  } catch (err) {
    throw err;
  }
}

export async function getUserEvents(userId: string) {
  try {
    const { docs: attendingListDocs } = await firestore().collection('users').doc(userId).collection('attendingEvents').get();

    const attendingEventIds = attendingListDocs.map((doc) => doc.id);

    return attendingEventIds;
  } catch (err) {
    throw err;
  }
}

export default {
  getEventList,
  getUserEvents,
  attendEvent,
  attendenceRemoval,
};
