import { makeAutoObservable, runInAction } from 'mobx';
import { RealtimeDatabase } from '@services/databaseWrapper';
import { LiveEvent } from '@types/collections';
import rootStore from './RootStore';

class LiveStore {
  rootStore: null | rootStore = null;
  locationsCount: { [locationId: string]: [number] } = {};
  locationProtesters: { [locationId: string]: string[] } = {}; // 6 Protester's profile pictures per locatoin

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

        runInAction(() => {
          this.locationsCount = locationsCount;
        });
      }
    });
  }

  async getLiveProtestersPictures(liveEvents: LiveEvent[]) {
    if (liveEvents.length === 0) return;
    // Grab 3 public check ins for each live event.
    try {
      const locationIds = liveEvents.map((event) => event.locationId);
      const locationsObject: { [locationId: string]: string[] } = {};

      const promises = locationIds.map((locationId) => {
        // Awaits for each query to resolve
        return new Promise((resolve, reject) => {
          const query = RealtimeDatabase.database
            .ref(`/checkIns/${locationId}`)
            .orderByChild('isActive')
            .equalTo(true)
            .limitToLast(3);

          query.once(
            'value',
            (snapshot) => {
              const value = snapshot.val();
              if (value) {
                const profilePictures = Object.values(value).map((checkIn: any) => checkIn.profilePicture);
                locationsObject[locationId] = profilePictures;
              } else {
                locationsObject[locationId] = [];
              }
              resolve(true);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });

      await Promise.all(promises);
      console.log(locationsObject);
      runInAction(() => {
        this.locationProtesters = locationsObject;
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default LiveStore;
