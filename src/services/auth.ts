import auth from '@react-native-firebase/auth';

export async function signInAnonymously() {
  try {
    await auth().signInAnonymously();
  } catch (err) {
    throw err;
  }
}
