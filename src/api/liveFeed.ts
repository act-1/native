import Firebase from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database';
const database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

export async function addCheckInEntry(checkInData) {
  // Anonoymous?

  // User name?

  // Profile Picture ?

  // eventId

  // locationName

  // address

  // city
  console.log(checkInData);
  const checkInRef = await database.ref('checkIns').push();
  await checkInRef.set({ createdAt: Firebase.database.ServerValue.TIMESTAMP, ...checkInData });
  console.log('1', checkInRef);
  return checkInRef;
}
