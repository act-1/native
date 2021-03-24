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
  region?: string;
  coordinates?: { _latitude: number; _longitude: number };

  likeCount: number;

  archived: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt?: FirebaseFirestoreTypes.Timestamp;
  featuredAt?: FirebaseFirestoreTypes.Timestamp;
};

type TextPost = PostBase & {
  type: 'text';
  text: string;
};

export type PicturePost = PostBase & {
  type: 'picture';
  pictureId: string;
  pictureWidth: number;
  pictureHeight: number;
  pictureUrl: string;
  featured: boolean;
  text?: string;
};

export type Post = TextPost | PicturePost;

/**
 * Location Type
 */

export type Location = {
  id: string;
  city: string;
  name: string;
  region: Region;
  coordinates: { _latitude: number; _longitude: number };
};

export type LocationRef = {
  locationId: string;
  locationCity: string;
  locationName: string;
  locationRegion: Region;
  coordinates: { _latitude: number; _longitude: number };
};

/*
 * Check In Types
 */

export type CheckIn = LocationRef & {
  id: string;
  expireAt: Date;
  fcmToken?: string;
  eventId?: string;
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
  region: Region;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
  compactThumbnail?: string;
  blurhash: string;
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
 * Select Entry
 * Location / Event types, being used in the check in location selection screen.
 */

type SelectLocationEntry = Location & { type: 'location' };
type SelectEventEntry = Event & { type: 'event' };

export type SelectEntry = SelectLocationEntry | SelectEventEntry;

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

export type Region = {
  id: string;
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  thumbnail?: string;
  counter?: number;
  expireAt: FirebaseFirestoreTypes.Timestamp;
};
