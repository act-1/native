import { makeAutoObservable, runInAction } from 'mobx';
import { ChatMessage } from '@types/collections';
import ChatService from '@services/chat';

import rootStore from './RootStore';

class ChatStore {
  rootStore: null | rootStore = null;
  currentRoomName: string = 'my-test-01';

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  async sendMessage({ text }: { text: string }) {
    try {
      const roomName = this.currentRoomName;
      const message = await ChatService.sendMessage({ roomName, text });
      console.log(message);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default ChatStore;
