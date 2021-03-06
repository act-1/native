type LatLng = [number, number];

// 🚨 PC ALERT 🚨 //
// The following line contains non-pc content.
// We know those are not correct pronouns, but that's the constant names used in Ivrita.js. Blames should go to thier issue list.
type Pronoun = 'MALE' | 'FEMALE' | 'NEUTRAL' | 'ORIGINAL';

type EventStatus = 'upcoming' | 'live' | 'past';

type PrivacyOption = 'PUBLIC' | 'PRIVATE' | 'ANONYMOUS';

type CheckIn = {
  id?: string;
  userId?: string;
  displayName?: string;
  profilePicture?: string;
  locationId: string;
  locationName: string;
  city: string;
  province: string;
  coordinates: { _latitude: number; _longitude: number } | any; // Any as a temp workaround for GeoPoint values
  eventId?: string | null;
  eventName?: string | null;
  eventThumbnail?: string;
  blurhash?: string;
  eventEndDate?: Date;
  expireAt: Date;
  createdAt: Date;
  isActive: boolean;
  privacySetting: PrivacyOption;
  protestersCount?: number;
};

type RTDBCheckIn = {
  id: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  userId: string;
  displayName: string;
  profilePicture: string;
  createdAt: number;
  expireAt: string;
  eventId: string | null;
  isActive: boolean;
};

type BoardingScreenProps = {
  nextPage: () => void;
  scrollToPage?: (index: number) => void;
  style?: ViewStyle;
  currentIndex?: number;
};

type GraphAPIResult = {
  picture: {
    data: {
      url: string;
    };
  };
};

type Province = [
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
