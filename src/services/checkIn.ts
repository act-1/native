import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
  // hola
  database = firebase.app().database('https://act1-dev-default-rtdb.firebaseio.com/');
}

const profilePicturePlaceholderURL =
  'https://firebasestorage.googleapis.com/v0/b/act1co.appspot.com/o/profilePicturePlaceholder.png?alt=media&token=06884d2b-b32d-4799-b906-280a7f52ba43';

type PublicCheckInProps = {
  checkInData: CheckInParams;
  displayName: string | null;
  profilePictureURL?: string | null;
};

export async function createCheckIn({ checkInData, displayName, profilePictureURL }: PublicCheckInProps) {
  const { locationId, locationName, locationCity, eventId, eventEndDate } = checkInData;

  // 1.5 hours from now - the default check in expiration time.
  let expireAt = new Date();
  expireAt.setTime(expireAt.getTime() + 1.5 * 60 * 60 * 1000);

  // Check if the user checks in to an event.
  // If they do - set the expiration time to the event end time.
  if (eventEndDate) {
    expireAt = eventEndDate;
  }

  try {
    const checkInRef = await database.ref('checkIns').push({
      locationId,
      locationName,
      locationCity,
      userId: auth().currentUser!.uid,
      displayName: displayName ? displayName : '',
      profilePicture: profilePictureURL ? profilePictureURL : profilePicturePlaceholderURL,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      expireAt,
      eventId: eventId || null,
      isActive: true,
    });

    const checkInSnapshot = await checkInRef.once('value');

    return checkInSnapshot.val();
  } catch (err) {
    console.error(err);
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
      await database.ref(`locationCounter/${locationId}`).set(firebase.database.ServerValue.increment(-1));
    }

    return { deleted: true };
  } catch (err) {
    throw err;
  }
}

export default {
  createCheckIn,
};
