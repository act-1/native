import { makeAutoObservable, runInAction } from 'mobx';
import { getEventList } from '../api/events';
import { createAnonymousUser } from '../api/user';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { IEvent } from '@types/event';

// TODO: Create AuthStore and EventStore

class RootStore {
  events: IEvent[] | [] = [];
  initializing = true;
  user: FirebaseAuthTypes.User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.getEvents();

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) this.user = user;
      else this.signInAnonymously();
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
      const events = await getEventList();
      runInAction(() => {
        this.events = events;
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default RootStore;
