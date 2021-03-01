import { Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import perf from '@react-native-firebase/perf';
import { updateUserPicture } from './user';
import { nanoid } from 'nanoid/non-secure';
import ImageResizer from 'react-native-image-resizer';

export async function uploadProfilePicture(imagePath: string) {
  try {
    // Workaround for non existing firebase storage emulator.
    // if (__DEV__) {
    //   return 'https://avatars.githubusercontent.com/u/75989338?s=200';
    // }

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

export async function uploadProfilePictureFromURL(imageUrl: string) {
  try {
    // Workaround for non existing firebase storage emulator.
    // if (__DEV__) {
    //   const filePath = '';
    //   await updateUserPicture(imageUrl, filePath);
    //   return imageUrl;
    // }

    const filePath = `/profilePictures/${auth().currentUser!.uid}/${nanoid(10)}.jpg`;
    const reference = storage().ref(filePath);

    const imageResult = await fetch(imageUrl);
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

/**
 * Promise wrapper for Image.getSize
 */
export function getImageSize(imageUri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      imageUri,
      (width, height) => resolve({ width, height }),
      (err) => reject(err)
    );
  });
}

export async function uploadPicture(imageUri: string) {
  try {
    const { uid: uploaderId } = auth().currentUser!;

    const { width, height } = await getImageSize(imageUri);

    // Whther to set the resize ratio based on the width (landscape image) or the height (portrait)
    const resizeDimension = width > height ? width : height;
    let resizeRatio = 1;

    // Resize dimensions for landscape picture
    if (resizeDimension > 5000) {
      resizeRatio = 2.2;
    }
    if (resizeDimension > 4000) {
      resizeRatio = 1.8;
    } else if (resizeDimension > 3000) {
      resizeRatio = 1.5;
    }

    const resizedWidth = width / resizeRatio;
    const resizedHeight = height / resizeRatio;

    const resizedImage = await ImageResizer.createResizedImage(imageUri, resizedWidth, resizedHeight, 'JPEG', 75);

    const uploadTrace = await perf().startTrace('imageUpload');
    uploadTrace.putMetric('image_size', resizedImage.size);

    const reference = storage().ref(`uploaded_pictures/${resizedImage.name}`);
    await reference.putFile(resizedImage.uri);

    uploadTrace.stop();

    const url = await reference.getDownloadURL();

    const picture = await firestore().collection('pictures').add({
      uploaderId,
      storagePath: reference.fullPath,
      width: resizedWidth,
      height: resizedHeight,
      url,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return { id: picture.id, url, width: resizedWidth, height: resizedHeight };
  } catch (err) {
    throw err;
  }
}

export default { uploadPicture };
