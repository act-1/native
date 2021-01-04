import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { fetchNearbyEventsAndLocations } from '@services/locations';
import { ILocation } from '@types/location';
import { IEvent } from '@types/event';

class LocationStore {
  rootStore: null | rootStore = null;
  nearbyLocations: (ILocation | IEvent)[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getNearbyLocationsAndEvents() {
    try {
      const data = await fetchNearbyEventsAndLocations({ position: [31.7670357, 35.2046522] });

      runInAction(() => {
        this.nearbyLocations = data;
      });
    } catch (err) {
      throw err;
    }
  }
}

export default LocationStore;
