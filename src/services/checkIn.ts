import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export async function createCheckIn(checkInParams: CheckInParams) {
  const { uid: userId } = auth().currentUser!;

  const { region, expireAt, fcmToken } = checkInParams;

  return firestore().collection('checkIns').doc(userId).set({
    region,
    fcmToken,
    createdAt: firestore.FieldValue.serverTimestamp(),
    expireAt,
  });
}
