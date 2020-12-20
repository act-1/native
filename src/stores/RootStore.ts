import { makeAutoObservable, runInAction } from 'mobx';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../api/events';
import { createAnonymousUser } from '../api/user';
import { IEvent } from '@types/event';

// TODO: Create AuthStore and EventStore

class RootStore {
  events: IEvent[] | [] = [];
  initializing = true;
  user: FirebaseAuthTypes.User | null = null;
  userEventIds: string[] = [];

  constructor() {
    makeAutoObservable(this);

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        this.user = user;
        this.getEvents();
        EventsAPI.getUserEvents(user.uid).then((events) => {
          this.userEventIds = events;
        });
      } else this.signInAnonymously();
    });
  }

  async signInAnonymously() {
    try {
      const { user } = await auth().signInAnonymously();
      await createAnonymousUser(user.uid);
    } catch (err) {
      console.error(err);
    }
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
          this.userEventIds = updatedUserEventIds;
        }
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default RootStore;
