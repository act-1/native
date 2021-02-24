import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ImagePickerResponse } from 'react-native-image-picker';
import { TakePictureResponse } from 'react-native-camera';

import { ILocation } from './location';

export type TabBarProps = BottomTabScreenProps<TabBarParamList>;
export type SelectLocationScreenProps = BottomTabScreenProps<RootStackParamList, 'CheckInSelectLocation'>;

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type EventPageScreenProps = StackScreenProps<RootStackParamList, 'EventPage'>;
export type EventListScreenProps = StackScreenProps<RootStackParamList, 'EventList'>;
export type CheckInFormScreenProps = StackScreenProps<RootStackParamList, 'CheckInForm'>;
export type LocationScreenProps = StackScreenProps<RootStackParamList, 'LocationPage'>;
export type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;
export type ActionScreenProps = StackScreenProps<RootStackParamList, 'ActionScreen'>;
export type NewPostProps = StackScreenProps<RootStackParamList, 'NewPost'>;
export type RecentPicturesProps = StackScreenProps<RootStackParamList, 'RecentPictures'>;
export type ProtestChatProps = StackScreenProps<RootStackParamList, 'ProtestChat'>;
export type CapturePictureProps = StackScreenProps<RootStackParamList, 'CapturePicture'>;

export type RootStackParamList = {
  AppTabs: undefined;
  Home: undefined;
  EventsNavigator: undefined;
  EventList: undefined;
  EventPage: { eventId: string };
  CheckInSelectLocation: undefined;
  CheckInForm: { checkInData: CheckInParams };
  LocationPage: { locationId: string };
  Profile: undefined;
  SignUpNavigator: undefined;
  SignUpForm: undefined;
  ActionScreen: undefined;
  NewPost: { image: ImagePickerResponse; completionScreen: 'closeModal'; location?: ILocation };
  CapturePicture: {
    onImageUpload: ({ image, text, inGallery }: { image: TakePictureResponse; text?: string; inGallery: boolean }) => void;
  };
  SelectLocation: undefined;
  Explore: undefined;
  ProtestChat: undefined;
  RecentPictures: { initialIndex?: number };
};

type TabBarParamList = {
  Home: undefined;
  CheckIn: undefined;
  Events: undefined;
};
