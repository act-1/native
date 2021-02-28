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
  pictureId: string;
  pictureWidth: number;
  pictureHeight: number;
  pictureUrl: string;
  featured: boolean;
  textContent?: string;
};

export type Post = TextPost | PicturePost;

/**
 * Location Type
 */

export type Location = {
  id: string;
  city: string;
  name: string;
  province: [
    'תל אביב',
    'השרון',
    'חיפה והקריות',
    'הגליל התחתון',
    'הגליל העליון',
    'גולן',
    'המרכז',
    'השפלה',
    'חוף אשקלון ועוטף עזה',
    'הנגב',
    'אילת והערבה',
    'ירושלים'
  ];
  coordinates: { _latitude: number; _longitude: number };
};

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

/**
 * Chat
 */

type ChatMessageBase = {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorPicture: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  deleted?: boolean;
  featured?: boolean;
  status?: 'pending' | 'sent';
};

export type ChatTextMessage = ChatMessageBase & {
  type: 'text';
};

export type ChatImageMessage = ChatMessageBase & {
  type: 'picture';
  pictureUrl: string;
  pictureWidth: number;
  pictureHeight: number;
};

export type ChatMessage = ChatTextMessage | ChatImageMessage;
