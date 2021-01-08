import { makeAutoObservable, runInAction } from 'mobx';
import crashlytics from '@react-native-firebase/crashlytics';
import rootStore from './RootStore';
import { fetchNearbyEventsAndLocations } from '@services/locations';
import { ILocation } from '@types/location';
import { IEvent } from '@types/event';

class LocationStore {
  rootStore: null | rootStore = null;
  nearbyLocations: (ILocation | IEvent)[] = [];
  fetchingLocations = false;

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getNearbyLocationsAndEvents(position: LatLng) {
    runInAction(() => {
      this.fetchingLocations = true;
    });

    try {
      const data = await fetchNearbyEventsAndLocations({ position });

      runInAction(() => {
        this.nearbyLocations = data;
        this.fetchingLocations = false;
      });
    } catch (err) {
      crashlytics().recordError(err);
      throw err;
    }
  }
}

export default LocationStore;
