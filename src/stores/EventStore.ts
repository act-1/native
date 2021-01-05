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

  async attendEvent({ eventId, eventDate }: { eventId: string; eventDate: Date }): Promise<{ attended: boolean } | undefined> {
    try {
      const result = await EventsAPI.attendEvent({ eventId, eventDate });
      this.rootStore?.userStore.userEventIds.push(eventId);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async unattendEvent({ eventId }: { eventId: string }): Promise<{ removed: boolean }> {
    try {
      let result;
      const { userEventIds } = this.rootStore!.userStore;

      if (userEventIds.includes(eventId)) {
        result = await EventsAPI.unattendEvent({ eventId });
        const updatedUserEventIds = userEventIds.filter((id) => id !== eventId);

        runInAction(() => {
          this.rootStore!.userStore.userEventIds = updatedUserEventIds;
        });
      } else {
        throw new Error('The eventId is missing from the user event Ids.');
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default EventStore;
