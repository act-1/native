import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { updateUserOnAuth } from '@services/user';

export async function signInAnonymously() {
  try {
    await auth().signInAnonymously();
  } catch (err) {
    throw err;
  }
}

export async function facebookLogin(): Promise<{ ok: boolean; isNewUser: boolean }> {
  try {
    // Attempt login with permissions
    const loginRequest = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (loginRequest.isCancelled) {
      throw new Error('User cancelled the login process');
    }

    // Once signed in, get the users AccesToken
    const token = await AccessToken.getCurrentAccessToken();

    if (!token) {
      throw new Error('Something went wrong obtaining access token');
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken);

    const userCredential = await auth().signInWithCredential(facebookCredential);
    const { additionalUserInfo } = userCredential;

    // Check if the account is new, and update the account info with the profile picture (so it'll be displayed in the sign up form)
    // The firestore account information will be set up through a cloud function authentication trigger.
    if (additionalUserInfo && !additionalUserInfo.isNewUser) {
      const photoURL = await getFacebookProfilePicture(token);
      console.log(photoURL);
      await auth().currentUser?.updateProfile({ photoURL });
      return { ok: true, isNewUser: true };
    }

    return { ok: true, isNewUser: false };
  } catch (err) {
    throw err;
  }
}

/**
 * Request large resolution profile picture from the Graph API
 * @param {string} token Facebook account access token
 * @returns {Promise<string>} The large profile picture url
 */
async function getFacebookProfilePicture(token: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token.accessToken,
        parameters: {
          fields: {
            string: 'picture.type(large)',
          },
        },
      },
      (error?: object, result?: GraphAPIResult) => {
        if (error) {
          crashlytics().log('Facebook profile picture request failed.');
          reject(error);
        } else {
          const { url } = result!.picture.data;
          resolve(url);
        }
      }
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  });
}

// if (auth().curregntUser?.isAnonymous) {
// If the user upgrades their account from anonymous:
// const userCredential = await auth().currentUser?.linkWithCredential(facebookCredential);
// THIS IS A TEST
