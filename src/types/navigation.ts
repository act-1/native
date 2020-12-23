import { StackScreenProps } from '@react-navigation/stack';

export type EventPageScreenProps = StackScreenProps<RootStackParamList, 'EventPage'>;
export type EventListScreenProps = StackScreenProps<RootStackParamList, 'EventList'>;
export type SelectLocationScreenProps = StackScreenProps<RootStackParamList, 'CheckInSelectLocation'>;
export type LocationScreenProps = StackScreenProps<RootStackParamList, 'LocationPage'>;

export type RootStackParamList = {
  Home: undefined;
  EventList: undefined;
  EventPage: { eventId: string };
  CheckInSelectLocation: undefined;
  LocationPage: { locationId: string };
};
