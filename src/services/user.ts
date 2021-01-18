import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { getDeviceId, getUniqueId } from 'react-native-device-info';

/**
 * Fetches the user's firestore document data.
 * @param userId - The user Id to fetch.
 */
export async function getUserData(userId: string) {
  try {
    const userSnapshot = await firestore().collection('users').doc(userId).get();
    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      return userData;
    } else {
      throw new Error("The user doesn't exist in firestore.");
    }
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
    return result.data;
  } catch (err) {
    throw err;
  }
}

/**
 * Update user account information - both the firebase user entity and the firestore document
 * @param displayName - The user's display name.
 * @param profilePicture - The profile picture URL.
 */
export async function updateUserInfo(displayName: string, profilePicture: string) {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not authenticated.');
    }

    await user.updateProfile({ displayName, photoURL: profilePicture });
    return firestore().collection('users').doc(user.uid).update({ displayName, profilePicture, isAnonymous: false });
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
    await user.updateProfile({ displayName });
    // Update firestore user document
    const userRef = firestore().collection('users').doc(user.uid);
    return userRef.update({ displayName, signupCompleted: true });
  } catch (err) {
    throw err;
  }
}

export async function updateUserPicture(pictureUrl: string, filePath: string) {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not authenticated.');
    }

    // Update firebase user display name
    await user.updateProfile({ photoURL: pictureUrl });
    // Update firestore user document
    const userRef = firestore().collection('users').doc(user.uid);
    return userRef.update({ profilePicture: pictureUrl, profilePicturePath: filePath });
  } catch (err) {
    throw err;
  }
}
