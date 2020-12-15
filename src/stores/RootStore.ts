import { makeAutoObservable, runInAction } from 'mobx';
import { getEventList } from '../api/events';
import { IEvent } from '@types/event';

class RootStore {
  events: IEvent[] | [] = [];

  constructor() {
    makeAutoObservable(this);
    this.getEvents();
  }

  async getEvents() {
    try {
      const events = await getEventList();
      console.log('RootStore events:', events);
      runInAction(() => {
        this.events = events;
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default RootStore;
