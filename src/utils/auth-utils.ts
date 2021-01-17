import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { updateUserInfo } from '@services/user';

type GraphAPIResult = {
  picture: {
    data: {
      url: string;
    };
  };
};

export async function facebookLogin() {
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

    // Convert an anonymous account to a permanent account
    const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken);

    const userCredential = await auth().currentUser?.linkWithCredential(facebookCredential);

    // Request high quality profile picture from facebook and upload it to firebase storage.
    const pictureUrl: string = await new Promise((resolve, reject) => {
      // Request a higher quality profile picture
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

    const displayName = userCredential?.additionalUserInfo?.profile?.name;
    await updateUserInfo(displayName, pictureUrl);

    return { ok: true, pictureUrl };
  } catch (err) {
    throw err;
  }
}
