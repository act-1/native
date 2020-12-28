import firestore from '@react-native-firebase/firestore';

export async function getAllPosts() {
  try {
    const postsQuerySnapshot = await firestore().collection('posts').get();
    const posts = postsQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(posts);
  } catch (err) {
    throw err;
  }
}
