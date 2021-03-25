import { makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';
import { RealtimeDatabase } from '@services/databaseWrapper';
import { Region } from '@types/collections';

class MapStore {
  rootStore: null | rootStore = null;
  protests: Protest[] = [];
  regions: { [region: string]: Region } = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    if (rootStore.userStore.user) {
      this.getProtests();
      this.getRegions();
    }
  }

  getProtests() {
    RealtimeDatabase.database
      .ref('locations')
      .orderByChild('counter')
      .startAt(1)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          this.protests = Object.values(snapshot.val());
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getRegions() {
    RealtimeDatabase.database
      .ref('regions')
      .orderByChild('counter')
      .startAt(1)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          runInAction(() => {
            this.regions = snapshot.val();
          });

          this.setRegionCounterListener(snapshot.val());
        }
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  setRegionCounterListener(regions: Region[]) {
    const regionKeys = Object.keys(regions);

    regionKeys.forEach((regionKey: string) => {
      RealtimeDatabase.database
        .ref('regions')
        .child(regionKey)
        .on(
          'child_changed',
          (snapshot) => {
            if (snapshot.key === 'counter') {
              runInAction(() => {
                const updatedRegion = Object.assign(this.regions[regionKey], { counter: snapshot.val() });
                this.regions[regionKey] = updatedRegion;
              });
            }
          },
          (err: any) => {
            console.error(err);
            throw err;
          }
        );
    });
  }
}

export default MapStore;
