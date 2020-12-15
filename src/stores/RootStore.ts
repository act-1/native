import { makeAutoObservable, runInAction } from 'mobx';
import { getEventList } from '../api/events';
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

    auth().onAuthStateChanged((user) => {
      this.user = user;
    });

    this.signInAnonymously();
  }

  signInAnonymously() {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        console.error(error);
      });
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
