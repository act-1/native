import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { makeAutoObservable, runInAction } from 'mobx';
import { ChatMessage } from '@types/collections';
import { RealtimeDatabase } from '@services/databaseWrapper';
import ChatService from '@services/chat';
import rootStore from './RootStore';

function getQueryBase(roomName: string) {
  return RealtimeDatabase.database.ref('chat/rooms').child(roomName).child('messages').orderByChild('createdAt').limitToLast(25);
}

class ChatStore {
  rootStore: null | rootStore = null;
  currentRoomName: string = 'my-test-01';
  listenerQuery: FirebaseDatabaseTypes.Query | undefined = undefined;
  queryListenerStatus: 'ON' | 'OFF' = 'OFF';

  messages: ChatMessage[] = [];

  constructor(rootStore: rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getMessages() {
    const query = getQueryBase(this.currentRoomName).endAt(Date.now());

    query.once('value', (snapshot) => {
      const messages = Object.values(snapshot.val());
      const sortedMessages = messages.sort((a, b) => b.createdAt - a.createdAt);
      console.log(messages);
      runInAction(() => {
        this.messages = [...this.messages, ...sortedMessages];
      });
    });
  }

  turnOnMessagesListener() {
    const query = getQueryBase(this.currentRoomName).startAt(Date.now());

    query.on(
      'child_added',
      (snapshot) => {
        const message = snapshot.val();
        console.log(message);
        runInAction(() => {
          this.messages = [message, ...this.messages];
        });
      },
      (err) => {
        console.error(err);
      }
    );

    runInAction(() => {
      this.queryListenerStatus = 'ON';
      this.listenerQuery = query;
    });
  }

  turnOffMessageListener() {
    this.listenerQuery?.off();

    runInAction(() => {
      this.queryListenerStatus = 'OFF';
      this.listenerQuery = undefined;
    });
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
