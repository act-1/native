import firestore from '@react-native-firebase/firestore';

export async function getAllPosts() {
  try {
    const posts = firestore().collection('posts');
    console.log(posts);
  } catch (err) {
    throw err;
  }
}
