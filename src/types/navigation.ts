import { StackNavigationProp } from '@react-navigation/stack';

export type EventPageScreenProp = StackNavigationProp<RootStackParamList, 'EventPage'>;

export type EventPageProps = {
  navigation: EventPageScreenProp;
};

export type RootStackParamList = {
  EventList: undefined;
  EventPage: undefined;
};
