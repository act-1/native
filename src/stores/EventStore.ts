import { makeAutoObservable, runInAction } from 'mobx';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../services/events';
import { createAnonymousUser } from '../services/user';
import { IEvent } from '@types/event';
import rootStore from './RootStore';

class EventStore {
  rootStore: null | rootStore = null;
  events: IEvent[] | [] = [];
  userEventIds: string[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
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
