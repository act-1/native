import { makeAutoObservable, runInAction } from 'mobx';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../services/events';
import { createAnonymousUser } from '../services/user';
import { IEvent } from '@types/event';
import rootStore from './RootStore';
import * as geofirestore from 'geofirestore';

class EventStore {
  rootStore: null | rootStore = null;
  events: IEvent[] | [] = [];
  userEventIds: string[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    // Create a GeoFirestore reference
    const GeoFirestore = geofirestore.initializeApp(firestore());

    // Create a GeoCollection reference
    const geocollection = GeoFirestore.collection('locations');

    // Add a GeoDocument to a GeoCollection
    // const doc = geocollection.doc('ahlon');
    // doc.set({
    //   name: 'צומת קדימה',
    //   address: 'קדימה', // The coordinates field must be a GeoPoint!
    //   coordinates: new firestore.GeoPoint(32.283406, 34.896686),
    // });
  }

  async getEvents() {
    try {
      const events = await EventsAPI.getEventList();
      runInAction(() => {
        this.events = events;
      });
      return events;
    } catch (err) {
      console.error(err);
    }
  }

  async attendEvent({
    eventId,
    type,
    eventDate,
  }: {
    eventId: string;
    type: string;
    eventDate?: FirebaseFirestoreTypes.Timestamp;
  }): Promise<{ attended?: boolean; removed?: boolean } | undefined> {
    try {
      let result;

      if (type === 'attend' && eventDate) {
        result = await EventsAPI.attendEvent({ eventId, eventDate });
        this.userEventIds.push(eventId);
      }
      if (type === 'remove') {
        if (this.userEventIds.includes(eventId)) {
          result = await EventsAPI.attendenceRemoval({ eventId });
          const updatedUserEventIds = this.userEventIds.filter((id) => id !== eventId);
          runInAction(() => {
            this.userEventIds = updatedUserEventIds;
          });
        }
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default EventStore;
