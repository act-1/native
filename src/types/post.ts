import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IPost = {
  id: string;

  authorId: string;
  authorName: string;
  authorPicture: string;

  locationId?: string;
  locationCity?: string;
  locationName?: string;
  province?: string;
  coordinates?: { _latitude: number; _longitude: number };

  textContent: string;

  likeCounter: number;

  type: 'post' | 'picture';

  pictureWidth?: number;
  pictureHeight?: number;
  pictureUrl?: string;

  archived: boolean;
  featured: boolean;

  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};
