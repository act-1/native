import firestore from '@react-native-firebase/firestore';
import { getDeviceId } from 'react-native-device-info';

export function createAnonymousUser(userId: string) {
  firestore().collection('users').doc(userId).set({
    isAnonymous: true,
    deviceId: getDeviceId(),
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}
