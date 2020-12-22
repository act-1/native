import { makeAutoObservable, runInAction } from 'mobx';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import rootStore from './RootStore';
import EventsAPI from '../api/events';
import { createAnonymousUser } from '../api/user';

// TODO: Create AuthStore and EventStore

class UserStore {
  rootStore: null | rootStore = null;
  user: FirebaseAuthTypes.User | null = null;
  userEventIds: string[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      if (user) {
        this.user = user;
        rootStore.eventStore?.getEvents(); // Only authed users can fetch the event list
        EventsAPI.getUserEvents(user.uid).then((events) => {
          runInAction(() => {
            this.userEventIds = events;
          });
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

export default UserStore;
