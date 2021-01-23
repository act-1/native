import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
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

export async function uploadImage(image) {
  try {
    const { uri, width, height } = image;

    // Whther to set the resize ratio based on the width (landscape image) or the height (portrait)
    const resizeDimension = image.width > image.height ? image.width : image.height;
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

    const resizedImage = await ImageResizer.createResizedImage(uri, width / resizeRatio, height / resizeRatio, 'JPEG', 75);

    const trace = await perf().startTrace('imageUpload');
    trace.putMetric(resizedImage.size);

    const reference = storage().ref(resizedImage.name);
    const task = reference.putFile(resizedImage.uri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(async () => {
      const pictureUrl = await reference.getDownloadURL();
      console.log('Done uplaoding!', pictureUrl);
      trace.stop();
      return pictureUrl;
    });
  } catch (err) {
    console.error(err);
  }
}
