import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import * as geofirestore from 'geofirestore';
import { Event } from '@types/collections';

// Create a GeoFirestore reference
const GeoFirestore = geofirestore.initializeApp(firestore());

// Create a GeoCollection reference
const geocollection = GeoFirestore.collection('events');

const getEventStatus = (startDate: Date, endDate: Date): EventStatus => {
  const now = new Date();

  // Set events to live 30 minutes before start
  const nowModified = new Date();
  nowModified.setMinutes(nowModified.getMinutes() + 30);

  if (now > endDate) {
    return 'past';
  }

  if (nowModified > startDate && now < endDate) {
    return 'live';
  }

  return 'upcoming';
};

// Get events between 6 days in the past to the upcoming 8 days.
export async function getEventList(): Promise<Event[]> {
  const weekBefore = new Date();
  weekBefore.setDate(weekBefore.getDate() - 6);

  const weekAfter = new Date();
  weekAfter.setDate(weekAfter.getDate() + 8);

  const querySnapshot = await geocollection.where('startDate', '>', weekBefore).where('startDate', '<', weekAfter).get();

  const documents = querySnapshot.docs.map((doc): FirebaseFirestoreTypes.DocumentData => ({ ...doc.data(), id: doc.id }));

  const events = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    shortTitle: doc.shortTitle,
    locationId: doc.locationId,
    locationName: doc.locationName,
    city: doc.city,
    thumbnail: doc.thumbnail,
    compactThumbnail: doc.compactThumbnail,
    content: doc.content,
    organizers: doc.organizers,
    attendingCount: doc.attendingCount,
    coordinates: doc.coordinates,
    startDate: doc.startDate.toDate(),
    endDate: doc.endDate.toDate(),
    status: getEventStatus(doc.startDate.toDate(), doc.endDate.toDate()),
  })) as Event[];

  return events;
}

export async function attendEvent({ eventId, eventDate }: { eventId: string; eventDate: Date }): Promise<{ attended: boolean }> {
  try {
    const userId = firebase.auth().currentUser?.uid;
    const userAttendRef = firestore().collection('users').doc(userId).collection('attendingEvents').doc(eventId);
    const eventAttendRef = firestore().collection('events').doc(eventId).collection('attending').doc(userId);
    const eventRef = firestore().collection('events').doc(eventId);

    const batch = firestore().batch();
    batch.set(eventAttendRef, { notifications: true, attendedAt: firestore.FieldValue.serverTimestamp() });
    batch.set(userAttendRef, { eventDate: eventDate, attendedAt: firestore.FieldValue.serverTimestamp() });
    batch.update(eventRef, { attendingCount: firestore.FieldValue.increment(1) });
    await batch.commit();

    await analytics().logEvent('attendEvent', { event_id: eventId });

    return { attended: true };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function unattendEvent({ eventId }: { eventId: string }): Promise<{ removed: boolean }> {
  try {
    // Add new attending entry in events check ins
    const userId = firebase.auth().currentUser?.uid;

    const userAttendRef = firestore().collection('users').doc(userId).collection('attendingEvents').doc(eventId);
    const eventAttendRef = firestore().collection('events').doc(eventId).collection('attending').doc(userId);
    const eventRef = firestore().collection('events').doc(eventId);

    // Delete user attending documents
    const batch = firestore().batch();
    batch.delete(userAttendRef);
    batch.delete(eventAttendRef);
    batch.update(eventRef, { attendingCount: firestore.FieldValue.increment(-1) });
    await batch.commit();

    await analytics().logEvent('unattend_event', { event_id: eventId });

    return { removed: true };
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
  unattendEvent,
};
