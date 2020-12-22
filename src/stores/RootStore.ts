import { makeAutoObservable } from 'mobx';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import EventsAPI from '../api/events';
import { createAnonymousUser } from '../api/user';
import eventStore from './EventStore';

// TODO: Create AuthStore and EventStore

class RootStore {
  initializing = true;
  user: FirebaseAuthTypes.User | null = null;
  userEventIds: string[] = [];
  eventStore: null | eventStore = null;

  constructor() {
    makeAutoObservable(this);
    this.eventStore = new eventStore(this);

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        this.user = user;
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
}

export default RootStore;
