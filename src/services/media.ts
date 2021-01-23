import functions from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

export async function uploadImage(image) {
  try {
    // const result = await functions().httpsCallable('uploadImageToCDN')({ image });
    // console.log(result);
  } catch (err) {
    console.error(err);
  }
}
