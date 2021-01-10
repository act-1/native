import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

export async function createUserCheckIn({ locationId, locationName, locationCity, eventId, eventEndDate }: CheckInParams) {
  try {
    const userId = auth().currentUser?.uid;

    // 1.5 hours from now - the default check in expiration time.
    let expireAt = new Date();
    expireAt.setTime(expireAt.getTime() + 1.5 * 60 * 60 * 1000);

    // Check if the user checks in to an event.
    // If they do - set the expiration time to the event end time.
    if (eventEndDate) {
      expireAt = eventEndDate;
    }

    const checkInInfo = {
      userId,
      eventId: eventId || null,
      locationId,
      locationName,
      locationCity,
      createdAt: firestore.FieldValue.serverTimestamp(),
      expireAt,
    };

    // Create check in documents
    const checkInRef = firestore().collection('checkIns').doc();
    const userCheckInRef = firestore().collection(`users/${userId}/checkIns`).doc(checkInRef.id);

    const batch = firestore().batch();
    batch.set(checkInRef, { ...checkInInfo, isActive: true });
    batch.set(userCheckInRef, { ...checkInInfo, isActive: true, id: checkInRef.id });
    await batch.commit();

    // Increment the location counter in the realtime database.
    await database.ref(`locationCounter/${locationId}`).set(firebase.database.ServerValue.increment(1));

    // Retrieve the saved check in object
    const checkInDocument = await userCheckInRef.get();
    const checkInData = checkInDocument.data();

    return { ok: true, checkIn: { ...checkInData, createdAt: new Date(), expireAt } };
  } catch (err) {
    throw err;
  }
}
