import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { RealtimeDatabase } from '@services/databaseWrapper';

class MapStore {
  rootStore: null | rootStore = null;
  protests: Protest[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
    this.getProtests();
  }

  getProtests() {
    RealtimeDatabase.database
      .ref('locations')
      .orderByChild('counter')
      .startAt(4)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          this.protests = Object.values(snapshot.val());
        }
      });
  }
}

export default MapStore;