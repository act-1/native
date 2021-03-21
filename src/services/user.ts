import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import Ivrita from 'ivrita';

export async function getUserFCMToken(userId: string, fcmToken: string) {
  try {
    return await firestore().collection(`users/${userId}/devices`).doc(fcmToken).get();
  } catch (err) {
    throw err;
  }
}

export async function createUserFCMToken(userId: string, fcmToken: string) {
  try {
    const result = await functions().httpsCallable('createUserFCMToken')({ userId, fcmToken });

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
    return userRef.update({ displayName });
  } catch (err) {
    throw err;
  }
}

export async function updateUserProvince(province: string) {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw new Error('User is not authenticated.');
    }

    const userRef = firestore().collection('users').doc(user.uid);
    return userRef.update({ province });
  } catch (err) {
    throw err;
  }
}

export async function updateUserPicture(pictureUrl: string, filePath: string | null) {
  try {
    const user = auth().currentUser;

    if (!user) throw new Error('User is not authenticated.');

    // Update firebase user display name
    await user.updateProfile({ photoURL: pictureUrl });
    // Update firestore user document
    const userRef = firestore().collection('users').doc(user.uid);
    return userRef.update({ profilePicture: pictureUrl, profilePicturePath: filePath });
  } catch (err) {
    throw err;
  }
}

export async function submitUserSignUpData(signUpData) {
  try {
    const user = auth().currentUser;
    const DEFAULT_PICTURE = 'https://res.cloudinary.com/act1/image/upload/v1610881280/profile_pictures/account-placeholder.png';

    updateUserPicture(DEFAULT_PICTURE, null);

    const { pronoun, avatar } = signUpData;

    let nickName = Ivrita.genderize('אנונימי.ת', Ivrita[pronoun]);
    if (avatar) {
      if (avatar === 'anarchist') {
        nickName = Ivrita.genderize('אנרכיסט.ית אנונימי.ת', Ivrita[pronoun]);
      }
      if (avatar === 'alien') {
        nickName = Ivrita.genderize('חייזר.ית אנונימי.ת', Ivrita[pronoun]);
      }
      if (avatar === 'diseaseDistributor') {
        nickName = Ivrita.genderize('מפיצ.ת מחלות', Ivrita[pronoun]);
      }
      if (avatar === 'traitor') {
        nickName = Ivrita.genderize('בוגד.ת אנונימי.ת', Ivrita[pronoun]);
      }
    }

    updateUserDisplayName(nickName);

    if (user) {
      return firestore()
        .collection('users')
        .doc(user.uid)
        .update({ ...signUpData, signupCompleted: true });
    } else {
      throw new Error('User is not authenticated.');
    }
  } catch (err) {
    throw err;
  }
}

export async function updateUserPronoun(pronoun: Pronoun) {
  try {
    const user = auth().currentUser;

    if (user) {
      return firestore().collection('users').doc(user.uid).update({ pronoun });
    }
  } catch (err) {
    throw err;
  }
}

export async function updateUserRegion(region: Region) {
  try {
    const user = auth().currentUser;

    if (user) {
      return firestore().collection('users').doc(user.uid).update({ region });
    }
  } catch (err) {
    throw err;
  }
}
