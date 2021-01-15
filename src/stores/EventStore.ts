import { makeAutoObservable, runInAction } from 'mobx';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../services/events';
import { updateArrayByObjectId } from '@utils/array-utils';
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

  async attendEvent({
    eventId,
    attendingCount,
    eventDate,
  }: {
    eventId: string;
    attendingCount: number;
    eventDate: Date;
  }): Promise<{ attended: boolean } | undefined> {
    try {
      // Add the event ID to the user events
      this.rootStore?.userStore.userEventIds.push(eventId);

      const updatedEvents = updateArrayByObjectId(this.events, eventId, { attendingCount: attendingCount + 1 });

      runInAction(() => {
        this.events = updatedEvents;
      });

      const result = await EventsAPI.attendEvent({ eventId, eventDate });

      return result;
    } catch (err) {
      throw err;
    }
  }

  async unattendEvent({ eventId, attendingCount }: { eventId: string; attendingCount: number }): Promise<{ removed: boolean }> {
    try {
      let result;
      const { userEventIds } = this.rootStore!.userStore;

      if (userEventIds.includes(eventId)) {
        const updatedEvents = updateArrayByObjectId(this.events, eventId, { attendingCount: attendingCount - 1 });

        runInAction(() => {
          this.events = updatedEvents;
        });
        const updatedUserEventIds = userEventIds.filter((id) => id !== eventId);

        runInAction(() => {
          this.rootStore!.userStore.userEventIds = updatedUserEventIds;
        });

        result = await EventsAPI.unattendEvent({ eventId });
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
