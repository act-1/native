import firestore from '@react-native-firebase/firestore';
import { getDeviceId } from 'react-native-device-info';

export async function createAnonymousUser(userId: string) {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const result = await userRef.set({
        isAnonymous: true,
        deviceId: getDeviceId(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return result;
    }
    throw new Error('User already exists.');
  } catch (err) {
    throw err;
  }
}
