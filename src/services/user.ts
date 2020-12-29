import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { getDeviceId, getUniqueId } from 'react-native-device-info';

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
