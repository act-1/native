import { makeAutoObservable, runInAction } from 'mobx';
import crashlytics from '@react-native-firebase/crashlytics';
import rootStore from './RootStore';
import { fetchNearbyEventsAndLocations } from '@services/locations';
import { ILocation } from '@types/location';
import { IEvent } from '@types/event';

class LocationStore {
  rootStore: null | rootStore = null;
  nearbyLocations: (ILocation | IEvent)[] = [];
  fetchedLocations = false;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getNearbyLocationsAndEvents() {
    runInAction(() => {
      this.fetchedLocations = false;
    });

    try {
      const position = this.rootStore?.userStore.userCurrentPosition;
      if (!position) throw new Error('User position is not available.');
      const data = await fetchNearbyEventsAndLocations({ position });

      runInAction(() => {
        this.nearbyLocations = data;
        this.fetchedLocations = true;
      });
    } catch (err) {
      crashlytics().recordError(err);
      throw err;
    }
  }
}

export default LocationStore;
