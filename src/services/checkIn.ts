import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import * as geofirestore from 'geofirestore';
import { RealtimeDatabase } from '@services/databaseWrapper';

const profilePicturePlaceholderURL =
  'https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/profilePicturePlaceholder.png?alt=media&token=06884d2b-b32d-4799-b906-280a7f52ba43';

const GeoFirestore = geofirestore.initializeApp(firestore());
const checkInsCollection = GeoFirestore.collection('checkIns');

export async function createCheckIn(checkInData: Checkin): Promise<{ ok: Boolean; checkIn: CheckInParams }> {
  try {
    const { uid: userId, displayName, photoURL } = auth().currentUser!;
    const {
      eventEndDate,
      eventId,
      textContent,
      locationId,
      locationName,
      locationCity,
      locationProvince,
      coordinates,
      privacySetting,
    } = checkInData;

    // 2 hours from now - the default check in expiration time.
    let expireAt = new Date();
    expireAt.setTime(expireAt.getTime() + 2 * 60 * 60 * 1000);

    // Check if the user checks in to an event.
    // If they do - set the expiration time to the event end time.
    if (eventEndDate) {
      expireAt = eventEndDate;
    }

    let checkInInfo = {
      locationId,
      locationName,
      locationCity,
      locationProvince,
      expireAt,
      privacySetting,
      coordinates: new firebase.firestore.GeoPoint(coordinates._latitude, coordinates._longitude),
      eventId: eventId || null,
      textContent: textContent || null,
      createdAt: firestore.FieldValue.serverTimestamp(),
      isActive: true,
    };

    if (privacySetting === 'PUBLIC' || privacySetting === 'PRIVATE') {
      checkInInfo = Object.assign(checkInInfo, {
        userId,
        profilePicture: photoURL || profilePicturePlaceholderURL,
        displayName: displayName || '',
      });
    }

    // Create check in document
    const checkInRef = checkInsCollection.doc();
    await checkInRef.set({ ...checkInInfo, id: checkInRef.id });

    return { ok: true, checkIn: { ...checkInInfo, id: checkInRef.id, createdAt: new Date(), expireAt } };
  } catch (err) {
    throw err;
  }
}

type DeleteCheckInParams = {
  checkInId: string;
  locationId: string;
  isActive?: boolean;
};

export async function deleteCheckIn({ checkInId, locationId, isActive = true }: DeleteCheckInParams) {
  try {
    const userId = auth().currentUser?.uid;
    const checkInRef = firestore().collection('checkIns').doc(checkInId);
    const userCheckInRef = firestore().collection(`users/${userId}/checkIns`).doc(checkInId);

    // Delete check in documents
    const batch = firestore().batch();
    batch.delete(checkInRef);
    batch.delete(userCheckInRef);
    await batch.commit();

    // Decrement the location counter in the realtime database if the check in is currently active.
    if (isActive) {
      await RealtimeDatabase.database.ref(`locationCounter/${locationId}`).set(firebase.database.ServerValue.increment(-1));
    }

    return { deleted: true };
  } catch (err) {
    throw err;
  }
}
