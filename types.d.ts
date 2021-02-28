type LatLng = [number, number];

type EventStatus = 'upcoming' | 'live' | 'past';

type PrivacyOption = 'PUBLIC' | 'PRIVATE' | 'ANONYMOUS';

type CheckIn = {
  id: string;
  userId?: string;
  displayName?: string;
  profilePicture?: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  locationProvince: string;
  coordinates: { _latitude: number; _longitude: number } | any; // Any as a temp workaround for GeoPoint values
  eventId?: string | null;
  eventName?: string | null;
  eventEndDate?: Date;
  expireAt: Date;
  createdAt: Date;
  isActive: boolean;
  privacySetting: PrivacyOption;
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
