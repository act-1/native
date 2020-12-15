import firestore from '@react-native-firebase/firestore';
import { getDeviceId } from 'react-native-device-info';

export async function createAnonymousUser(userId: string) {
  const userRef = firestore().collection('users').doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    userRef.set({
      isAnonymous: true,
      deviceId: getDeviceId(),
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  }
}
