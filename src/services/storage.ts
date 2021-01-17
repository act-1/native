import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { updateUserPicture } from './user';
import { nanoid } from 'nanoid/non-secure';

export async function uploadProfilePicture(imagePath: string) {
  try {
    const reference = storage().ref(`/profilePictures/${auth().currentUser!.uid}/${nanoid(10)}.png`);
    await reference.putFile(imagePath);
    const pictureUrl = await reference.getDownloadURL();
    await updateUserPicture(pictureUrl);
    return pictureUrl;
  } catch (err) {
    throw err;
  }
}
