import functions from '@react-native-firebase/functions';

export async function createUserCheckIn(locationId: string, eventId?: string) {
  try {
    const result = await functions().httpsCallable('userCheckIn')({ locationId, eventId });
    console.log(result);
  } catch (err) {
    throw err;
  }
}
