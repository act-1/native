import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { RealtimeDatabase } from '@services/databaseWrapper';

const profilePicturePlaceholderURL =
  'https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/profilePicturePlaceholder.png?alt=media&token=06884d2b-b32d-4799-b906-280a7f52ba43';

export async function createCheckIn({
  locationId,
  locationName,
  locationCity,
  eventId,
  eventEndDate,
}: CheckInParams): Promise<{ ok: Boolean; checkIn: CheckInParams }> {
  try {
    const { uid: userId, displayName, photoURL } = auth().currentUser!;

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
      displayName: displayName || '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      expireAt,
      profilePicture: photoURL || profilePicturePlaceholderURL,
      isActive: true,
    };

    // Create check in documents
    const checkInRef = firestore().collection('checkIns').doc();
    await checkInRef.set({ ...checkInInfo, id: checkInRef.id });

    return { ok: true, checkIn: { ...checkInInfo, id: checkInRef.id, createdAt: new Date(), expireAt } };
  } catch (err) {
    throw err;
  }
}

type PublicCheckInProps = {
  checkInInfo: CheckInParams;
  displayName: string | null;
  profilePictureURL?: string | null;
};

// async function publicCheckIn({ checkInInfo, displayName, profilePictureURL }: PublicCheckInProps) {
//   const { locationId, locationName, locationCity, id: checkInId, eventId, expireAt } = checkInInfo;
//   try {
//     // Get user public check in perferences
//     // const userDoc = await firestore().collection('users').doc(userId).get();
//     // const publicCheckInPerf = userDoc.data().publicCheckIn;

//     // if (publicCheckInPerf === true) {
//     return RealtimeDatabase.database.ref(`checkIns/${locationId}/${checkInId}`).set({
//       id: checkInId,
//       locationId,
//       locationName,
//       locationCity,
//       userId: auth().currentUser!.uid,
//       displayName: displayName ? displayName : '',
//       profilePicture: profilePictureURL ? profilePictureURL : profilePicturePlaceholderURL,
//       createdAt: RealtimeDatabase.database.ServerValue.TIMESTAMP,
//       expireAt,
//       eventId: eventId || null,
//       isActive: true,
//     });
//     // } else {
//     //   return { ok: false, message: 'The user set public check in off.' };
//     // }
//   } catch (err) {
//     throw err;
//   }
// }

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
