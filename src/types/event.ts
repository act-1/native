import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type IEvent = {
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
  type?: 'event';
  pastEvent: boolean;
};
