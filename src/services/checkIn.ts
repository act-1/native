import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function createCheckIn(region: string, expireAt: Date, fcmToken: string) {
  const { uid: userId } = auth().currentUser!;
  firestore().collection('checkIns').doc(userId).set({
    region,
    fcmToken,
    createAt: firestore.FieldValue.serverTimestamp(),
    expireAt: Date,
  });
}
