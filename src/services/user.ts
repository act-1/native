import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { getDeviceId, getUniqueId } from 'react-native-device-info';

export async function createAnonymousUser(userId: string) {
  try {
    const userRef = firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      const result = await userRef.set({
        isAnonymous: true,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return result;
    }
    throw new Error('User already exists.');
  } catch (err) {
    throw err;
  }
}

export async function getUserFCMToken(userId: string, fcmToken: string) {
  try {
    return await firestore().collection(`users/${userId}/devices`).doc(fcmToken).get();
  } catch (err) {
    throw err;
  }
}

export async function createUserFCMToken(userId: string, fcmToken: string) {
  try {
    const deviceId = getUniqueId();
    const deviceName = getDeviceId();

    const result = await functions().httpsCallable('createUserFCMToken')({ userId, fcmToken, deviceId, deviceName });
    console.log(result);
  } catch (err) {
    throw err;
  }
}
