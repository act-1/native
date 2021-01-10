type LatLng = [number, number];

type CheckInParams = {
  id: string;
  locationId: string;
  locationName: string;
  locationCity: string;
  eventId?: string;
  eventEndDate?: Date;
  expireAt: Date;
  createdAt: Date;
};
