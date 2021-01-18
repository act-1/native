import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { updateUserPicture } from './user';
import { nanoid } from 'nanoid/non-secure';

export async function uploadProfilePicture(imagePath: string) {
  try {
    const filePath = `/profilePictures/${auth().currentUser!.uid}/${nanoid(10)}.jpg`;
    const reference = storage().ref(filePath);
    await reference.putFile(imagePath);
    const pictureUrl = await reference.getDownloadURL();
    await updateUserPicture(pictureUrl, filePath);
    return pictureUrl;
  } catch (err) {
    throw err;
  }
}

// export async function deleteProfilePicture() {
//   try {
//     const reference = storage().ref(`/profilePictures/${auth().currentUser!.uid}/${nanoid(10)}.png`);
//     await reference.putFile(imagePath);
//     const pictureUrl = await reference.getDownloadURL();
//     await pictureUrl;
//     return pictureUrl;
//   } catch (err) {
//     throw err;
//   }
// }
