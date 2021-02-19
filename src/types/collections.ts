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

/*
 * Event Types
 */

type EventBase = {
  id: string;
  title: string;
  shortTitle?: string;
  locationId: string;
  locationName: string;
  city: string;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
  compactThumbnail?: string;
  content: string;
  organizers: { id: string; profilePicture: string; name: string }[];
  attendingCount: number;
  coordinates: { _latitude: number; _longitude: number };
  status: EventStatus;
};

export type UpcomingEvent = EventBase & {
  status: 'upcoming';
};

export type LiveEvent = EventBase & {
  status: 'live';
};

export type PastEvent = EventBase & {
  status: 'past';
  protestersCount: number;
};

export type Event = UpcomingEvent | LiveEvent | PastEvent;
