import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import * as geofirestore from 'geofirestore';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import { Post, PicturePost, Event, Location } from '@types/collections';
import Storage, { uploadPicture } from './storage';

const GeoFirestore = geofirestore.initializeApp(firestore());
const postsCollection = GeoFirestore.collection('posts');

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

/**
 * Returns the post IDs the user liked.
 */
export async function getAllPostLikes() {
  try {
    const userId = auth().currentUser!.uid;
    const snapshot = await firestore().collection(`users/${userId}/likes`).get();
    const postIds = snapshot.docs.map((likeDoc) => likeDoc.id);
    return postIds;
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

type CreateTextPostProps = {
  text: string;
  locationData: {
    locationId: string;
    locationName: string;
    locationCity: string;
    locationProvince: string;
    coordinates: { _latitude: number; _longitude: number };
  };
};

export async function createTextPost({ text, locationData }: CreateTextPostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const postRef = postsCollection.doc();

      await postRef.set({
        id: postRef.id,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        text,
        ...locationData,
        likeCount: 0,
        type: 'text',
        coordinates: new firebase.firestore.GeoPoint(locationData.coordinates._latitude, locationData.coordinates._longitude),
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        archived: false,
      });
    }
  } catch (err) {
    throw err;
  }
}

type NewImagePostProps = {
  imageUri: string;
  text?: string;
  location?: Location;
  event?: Event;
};

export async function newImagePost({ imageUri, text, location, event }: NewImagePostProps) {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const uploadedImage = await Storage.uploadPicture(imageUri);

      let postData = {
        type: 'picture',
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPicture: currentUser.photoURL,
        pictureWidth: uploadedImage.width,
        pictureHeight: uploadedImage.height,
        pictureUrl: uploadedImage.url,
        pictureId: uploadedImage.id,
        archived: false,
        featured: false,
        homeScreen: false,
        likeCount: 0,
        text,
      };

      if (event) {
        postData = {
          ...postData,
          eventId: event.id,
          eventTitle: event.title,
          locationId: event.locationId,
          locationName: event.locationName,
          province: event.province,
          city: event.city,
          coordinates: new firebase.firestore.GeoPoint(event.coordinates._latitude, event.coordinates._longitude),
        };
      }

      let postRef = null;

      if (location) {
        postData = {
          ...postData,
          locationId: location.id,
          locationName: location.name,
          city: location.city,
          province: location.province,
          coordinates: new firebase.firestore.GeoPoint(location.coordinates._latitude, location.coordinates._longitude),
        };
      }

      postRef = postsCollection.doc();

      await postRef.set({
        ...postData,
        id: postRef.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      const postDocument = await postRef.get();
      return postDocument;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function archivePost(postId: string) {
  return firestore().collection('posts').doc(postId).update({
    archived: true,
    updatedAt: firestore.FieldValue.serverTimestamp(),
    archivedAt: firestore.FieldValue.serverTimestamp(),
  });
}
type GetRecentPicturesProps = {
  limit?: number;
  startAfter?: FirebaseFirestoreTypes.DocumentData;
  afterDate?: FirebaseFirestoreTypes.Timestamp;
};

export async function getRecentPictures({ limit = 10, startAfter, afterDate }: GetRecentPicturesProps) {
  try {
    let query = firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // There's a strange behavior with the startAfter and limit conditions if we build the
    // query incrementally, so we create a new one.
    if (startAfter) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .orderBy('createdAt', 'desc')
        .startAfter(startAfter)
        .limit(limit);
    }

    // Get new picture, created after the specified date
    if (afterDate) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where('createdAt', '>', afterDate)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    const postsSnapshot = await query.get();

    return postsSnapshot.docs;
  } catch (err) {
    throw err;
  }
}

export async function getHomeScreenPictures(): Promise<PicturePost[]> {
  try {
    const postsSnapshot = await firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('homeScreen', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(8)
      .get();

    const posts = postsSnapshot.docs.map((post) => post.data() as PicturePost);
    return posts;
  } catch (err) {
    throw err;
  }
}

type EventPicturesProps = {
  source: 'event' | 'location';
  sourceId: string;
  limit?: number;
  startAfter?: FirebaseFirestoreTypes.DocumentData;
  afterDate?: FirebaseFirestoreTypes.Timestamp;
};

export async function getPictures({ source, sourceId, startAfter, afterDate, limit = 10 }: EventPicturesProps) {
  const sourceField = source + 'Id'; // `event` -> eventId, location -> locationId

  try {
    let query = firestore()
      .collection('posts')
      .where('type', '==', 'picture')
      .where('archived', '==', false)
      .where(sourceField, '==', sourceId)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    // There's a strange behavior with the startAfter and limit conditions if we build the
    // query incrementally, so we create a new one.
    if (startAfter) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where(sourceField, '==', sourceId)
        .orderBy('createdAt', 'desc')
        .startAfter(startAfter);

      if (limit) {
        query.limit(limit);
      }
    }

    // Get new picture, created after the specified date
    if (afterDate) {
      query = firestore()
        .collection('posts')
        .where('type', '==', 'picture')
        .where('archived', '==', false)
        .where(sourceField, '==', sourceId)
        .where('createdAt', '>', afterDate)
        .orderBy('createdAt', 'desc');

      if (limit) {
        query.limit(limit);
      }
    }

    const picturesSnapshot = await query.get();
    return picturesSnapshot.docs;
  } catch (err) {
    throw err;
  }
}

export default {
  newImagePost,
  getRecentPictures,
  getHomeScreenPictures,
  getPictures,
  archivePost,
};
