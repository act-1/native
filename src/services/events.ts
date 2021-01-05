import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import * as geofirestore from 'geofirestore';
import { IEvent } from '@types/event';

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
      locationId: doc.locationId,
      locationName: doc.locationName,
      thumbnail: new URL(doc.thumbnail),
      content: doc.content,
      organizers: doc.organizers,
      attendingCount: doc.attendingCount,
      coordinates: doc.coordinates,
      startDate: doc.startDate.toDate(),
      endDate: doc.endDate.toDate(),
      pastEvent: doc.pastEvent,
    })
  );

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
