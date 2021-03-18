import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CheckIn } from '@types/collections';

export async function createCheckIn(checkInParams: CheckIn) {
  const { uid: userId } = auth().currentUser!;

  return firestore()
    .collection('checkIns')
    .doc(userId)
    .set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...checkInParams,
    });
}
