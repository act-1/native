import auth from '@react-native-firebase/auth';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import perf from '@react-native-firebase/perf';
import { updateUserPicture } from './user';
import { nanoid } from 'nanoid/non-secure';
import ImageResizer from 'react-native-image-resizer';

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

export async function uploadProfilePictureFromURL(iamgeURL: string) {
  try {
    const filePath = `/profilePictures/${auth().currentUser!.uid}/${nanoid(10)}.jpg`;
    const reference = storage().ref(filePath);

    const imageResult = await fetch(iamgeURL);
    const imageBlob = await imageResult.blob();
    await reference.put(imageBlob);
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
