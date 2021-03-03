import { makeAutoObservable, runInAction } from 'mobx';
import { RealtimeDatabase } from '@services/databaseWrapper';
import { LiveEvent } from '@types/collections';
import rootStore from './RootStore';

class LiveStore {
  rootStore: null | rootStore = null;
  locationsCount: { [locationId: string]: [number] } = {};

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setLiveListeners() {
    // Get location counters for count > 1
    const checkInCount = RealtimeDatabase.database.ref('locationCounter').orderByValue().startAt(1);

    checkInCount.once('value', (snapshot) => {
      runInAction(() => {
        this.locationsCount = snapshot.val();
      });
    });

    checkInCount.on('child_changed', (snapshot) => {
      if (snapshot.val()) {
        const locationId = snapshot.key as string;
        const locationCounter = snapshot.val();
        const updatedLocation = { [locationId]: locationCounter };

        const locationsCount = Object.assign(this.locationsCount, updatedLocation);
        runInAction(() => (this.locationsCount = locationsCount));
      }
    });
  }
}

export default LiveStore;
