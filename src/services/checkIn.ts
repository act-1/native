import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function createCheckIn(checkInParams: CheckInParams) {
  const { uid: userId } = auth().currentUser!;

  const { region, expireAt, fcmToken } = checkInParams;

  firestore().collection('checkIns').doc(userId).set({
    region,
    fcmToken,
    createAt: firestore.FieldValue.serverTimestamp(),
    expireAt,
  });
}
