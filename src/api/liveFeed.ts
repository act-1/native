import Firebase from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
const database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

export async function addCheckInEntry(checkInData) {
  // Anonoymous?

  // User name?

  // Profile Picture ?

  // locationName

  // address

  // city
  const checkInRef = await database.ref('checkIns').push();
  await checkInRef.set({ createdAt: Firebase.database.ServerValue.TIMESTAMP, ...checkInData });

  // Increase location check in count
  const { locationId, eventId } = checkInData;
  await database.ref(`locationCheckInCounter/${locationId}`).set(firebase.database.ServerValue.increment(1));

  // Increase event check in count
  if (eventId) {
    await database.ref(`eventCheckInCounter/${eventId}`).set(firebase.database.ServerValue.increment(1));
  }

  return checkInRef;
}
