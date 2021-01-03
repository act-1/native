import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { ILocation } from '@types';
import { fetchNearbyLocations } from '@services/locations';

class LocationStore {
  rootStore: null | rootStore = null;
  nearbyLocations: ILocation[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async getNearbyLocations() {
    try {
      const snapshot = await fetchNearbyLocations({ position: [31.7670357, 35.2046522] });
      const locationsData = snapshot.docs.map((doc) => doc.data());
      runInAction(() => {
        this.nearbyLocations = locationsData;
      });
    } catch (err) {
      throw err;
    }
  }
}

export default LocationStore;
