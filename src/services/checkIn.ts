import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

type CheckInProps = {
  userId: string;
  eventId: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  createdAt: FirebaseFirestore.Timestamp;
  expireAt: FirebaseFirestore.Timestamp;
};

export async function createUserCheckIn({
  locationId,
  locationName,
  locationCity,
  eventId,
  eventEndDate,
}: CheckInParams): Promise<{ ok: Boolean; checkIn: CheckInParams }> {
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
    const checkInData: CheckInParams = checkInDocument.data();

    console.log(checkInData);
    console.log(auth().currentUser);
    // // check if user is not anonymous
    if (auth().currentUser?.isAnonymous === false) {
      publicCheckIn(checkInData);
    }

    return { ok: true, checkIn: { ...checkInData, createdAt: new Date(), expireAt, id: checkInDocument.id } };
  } catch (err) {
    throw err;
  }
}

async function publicCheckIn(checkInInfo: CheckInProps) {
  const { userId, locationId, locationName, locationCity, id: checkInId, eventId, expireAt } = checkInInfo;
  try {
    console.log(checkInInfo);

    // Get user public check in perferences
    // const userDoc = await firestore().collection('users').doc(userId).get();
    // const publicCheckInPerf = userDoc.data().publicCheckIn;

    // if (publicCheckInPerf === true) {
    database.ref(`checkIns/${locationId}/${checkInId}`).set({
      locationId,
      locationName,
      locationCity,
      userId,
      userName: 'Guy Tepper',
      profilePicture:
        'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
      expireAt,
      eventId: eventId || null,
      isActive: true,
    });
    // } else {
    //   return { ok: false, message: 'The user set public check in off.' };
    // }
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
      await database.ref(`locationCounter/${locationId}`).set(firebase.database.ServerValue.increment(-1));
    }

    return { deleted: true };
  } catch (err) {
    throw err;
  }
}

export default {
  publicCheckIn,
};
