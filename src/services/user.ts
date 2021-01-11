import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
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
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateUserDisplayName(displayName: string) {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not authenticated.');
    }

    // Update firebase user display name
    user.updateProfile({ displayName });

    // Update firestore user document
    const userRef = firestore().collection('users').doc(user.uid);
    return userRef.update({ displayName });
  } catch (err) {
    throw err;
  }
}
