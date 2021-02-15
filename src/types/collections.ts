import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * Post Types
 */

type PostBase = {
  id: string;

  authorId: string;
  authorName: string;
  authorPicture: string;

  locationId?: string;
  locationCity?: string;
  locationName?: string;
  province?: string;
  coordinates?: { _latitude: number; _longitude: number };

  likeCount: number;

  archived: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt?: FirebaseFirestoreTypes.Timestamp;
  featuredAt?: FirebaseFirestoreTypes.Timestamp;
};

type TextPost = PostBase & {
  type: 'text';
  textContent: string;
};

export type PicturePost = PostBase & {
  type: 'picture';
  pictureWidth: number;
  pictureHeight: number;
  pictureUrl: string;
  featured: boolean;
  textContent?: string;
};

export type Post = TextPost | PicturePost;
