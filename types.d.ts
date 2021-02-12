type LatLng = [number, number];

type CheckInParams = {
  id: string;
  userId: string;
  displayName: string;
  profilePicture: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  eventId: string | null;
  eventEndDate?: Date;
  expireAt: Date;
  createdAt: Date;
  isActive: boolean;
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
  scrollToPage: (index: number) => void;
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
