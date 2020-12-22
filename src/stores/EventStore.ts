import { makeAutoObservable, runInAction } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../api/events';
import { createAnonymousUser } from '../api/user';
import { IEvent } from '@types/event';
import rootStore from './RootStore';
// TODO: Create AuthStore and EventStore

class RootStore {
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

export default RootStore;
