import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

export async function createUserCheckIn(locationId: string, eventId?: string) {
  try {
    console.log('123');
    const result = await functions().httpsCallable('userCheckIn')({ locationId, eventId });
    console.log(result);
  } catch (err) {
    throw err;
  }
}
