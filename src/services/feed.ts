import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { IPost, IPicturePost } from '@types/post';
import Storage, { uploadPicture } from './storage';
import { ImagePickerResponse } from 'react-native-image-picker';

export async function getAllPosts(userId: string): Promise<IPost[]> {
  try {
    const postsQuerySnapshot = await firestore().collection('posts').orderBy('timestamp', 'desc').get();
    const postsDocuments = postsQuerySnapshot.docs.map(
      (doc): FirebaseFirestoreTypes.DocumentData => ({
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
        id: doc.id,
      })
    );

    // Check if the user has liked each post
    const withUserLikes = postsDocuments.map(
      async (post): IPost => {
        // TODO: Update with the current user id
        const liked = await checkUserPostLike(post.id, userId);
        return { ...post, liked };
      }
    );

    const posts: IPost[] = await Promise.all(withUserLikes);

    return posts;
  } catch (err) {
    throw err;
  }
}

/**
 * Check if the user has liked a specific post.
 * @param postId The post Id to check the user's like ststus.
 * @param userId The user Id to check the like status for.
 * @returns {Promise} Resolved with the like status (true/false)
 */
async function checkUserPostLike(postId: string, userId: string): Promise<boolean> {
  try {
    const like = await firestore().collection(`posts/${postId}/likes`).doc(userId).get();

    if (like.exists) {
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId: string): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('likePost')({ postId });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function unlikePost(postId: string): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('unlikePost')({ postId });
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function updateCheckInCount(): Promise<{ updated: boolean; action: string }> {
  try {
    const result = await functions().httpsCallable('updateCheckInCountManually')();
    return result.data;
  } catch (err) {
    throw err;
  }
}

type NewImagePostProps = {
  image: ImagePickerResponse;
  text?: string;
  locationId?: string;
};

export async function newImagePost({ image, text }: NewImagePostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uploadedImage = await Storage.uploadPicture(image);
      console.log(currentUser.uid, currentUser.displayName, currentUser.photoURL);

      const postRef = firestore().collection('posts').doc();

      const postData = {
        id: postRef.id,
        type: 'picture',
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        pictureWidth: uploadedImage.width,
        pictureHeight: uploadedImage.height,
        pictureUrl: uploadedImage.url,
        storagePath: uploadedImage.storagePath,
        archived: false,
        featured: false,
        homeScreen: false,
        likeCounter: 0,
        text,
      };

      postRef.set({
        ...postData,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      return postData;
      /**
       * locationId
       * locationName
       * locationCity
       * locationProvince
       * coordinates (GeoFirestore)
       */
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getRecentPictures(): Promise<IPicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as IPicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

export async function getFeaturedPictures(): Promise<IPicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('featured', '==', true)
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as IPicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

export default {
  newImagePost,
  getRecentPictures,
  getFeaturedPictures,
};
