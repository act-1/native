import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { IEvent } from '@types/event';
import { formatLocalDay, formatShortDate, formatUpcomingDate, parseLocalDate } from '../utils/date-utils';
import { format } from 'date-fns';

export async function getEventList(): Promise<IEvent[]> {
  const querySnapshot = await firestore().collection('events').orderBy('timestamp').get();
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
    const user = auth().currentUser;
    if (user) {
      // Ensure the user isn't attending the event already.
      const attendingRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('attendingEvents')
        .doc(eventId);
      const attendingDoc = await attendingRef.get();

      if (!attendingDoc.exists) {
        const batch = firestore().batch();

        // Create a user attending document
        batch.set(attendingRef, { eventDate: eventDate, attendedAt: firestore.FieldValue.serverTimestamp() });

        // Increase the event attending counter
        const eventRef = firestore().collection('events').doc(eventId);
        batch.update(eventRef, { attendingCount: firestore.FieldValue.increment(1) });

        // Commit both changes atomically
        await batch.commit();

        return { attended: true };
      } else {
        // TODO: Fix ESLint condition error
        throw new Error('The user is already attending the event.');
      }
    }
    throw new Error('Not authenticated.');
  } catch (err) {
    throw err;
  }
}

export async function attendenceRemoval({ eventId }: { eventId: string }): Promise<{ removed: boolean }> {
  try {
    const user = auth().currentUser;
    if (user) {
      // Ensure the user isn't attending the event already.
      const attendingRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('attendingEvents')
        .doc(eventId);
      const attendingDoc = await attendingRef.get();

      if (attendingDoc.exists) {
        const batch = firestore().batch();

        // Delete the user attending document
        batch.delete(attendingRef);

        // Decrease the event attending counter
        const eventRef = firestore().collection('events').doc(eventId);
        batch.update(eventRef, { attendingCount: firestore.FieldValue.increment(-1) });

        // Commit both changes atomically
        await batch.commit();

        return { removed: true };
      } else {
        // TODO: Fix ESLint condition error
        throw new Error('The user is not attending the event.');
      }
    }
    throw new Error('Not authnticated');
  } catch (err) {
    throw err;
  }
}

export async function getUserEvents(userId: string) {
  try {
    const { docs: attendingListDocs } = await firestore()
      .collection('users')
      .doc(userId)
      .collection('attendingEvents')
      .get();

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
