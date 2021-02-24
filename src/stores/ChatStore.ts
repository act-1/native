import { keys, makeAutoObservable, runInAction } from 'mobx';
import rootStore from './RootStore';

import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import ChatService from '@services/chat';
import { RealtimeDatabase } from '@services/databaseWrapper';
import { ChatMessage } from '@types/collections';

import { TakePictureResponse } from 'react-native-camera';
import { nanoid } from 'nanoid/non-secure';
import { getUnixTime } from 'date-fns';
import { updateArrayByObjectId } from '@utils/array-utils';
import { PictureList } from '@components/';

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
      if (snapshot.val() !== null) {
        const messages = Object.values(snapshot.val());
        const sortedMessages = messages.sort((a, b) => b.createdAt - a.createdAt);

        runInAction(() => {
          this.messages = [...this.messages, ...sortedMessages];
        });
      }
    });
  }

  turnOnMessagesListener() {
    const { uid: userId } = auth().currentUser!;
    const query = getQueryBase(this.currentRoomName).startAt(Date.now());

    query.on(
      'child_added',
      (snapshot) => {
        const newMessage = snapshot.val() as ChatMessage;

        // Check if a pending message exists
        if (newMessage.authorId === userId) {
          const updatedMessages = updateArrayByObjectId(this.messages, newMessage.id, newMessage);
          runInAction(() => {
            this.messages = updatedMessages;
          });
        } else {
          runInAction(() => {
            this.messages = [newMessage, ...this.messages];
          });
        }
      },
      (err) => {
        console.error(err);
      }
    );

    const newQuery = getQueryBase(this.currentRoomName);

    newQuery.on('child_changed', (snapshot) => {
      const updatedMessage = snapshot.val() as ChatMessage;
      console.log(updatedMessage);
      // Check if a pending message exists
      if (updatedMessage.deleted) {
        const updatedMessages = updateArrayByObjectId(this.messages, updatedMessage.id, updatedMessage);
        runInAction(() => {
          this.messages = updatedMessages;
        });
      }
    });
  }

  turnOffMessageListener() {
    this.listenerQuery?.off();

    runInAction(() => {
      this.queryListenerStatus = 'OFF';
      this.listenerQuery = undefined;
    });
  }

  addPendingMessage({ messageKey, text, type, image }) {
    const { uid: authorId, displayName: authorName, photoURL: authorPicture } = auth().currentUser!;

    let message: ChatMessage = {
      id: messageKey,
      authorId,
      authorName,
      authorPicture,
      text,
      createdAt: new Date(),
      type,
      status: 'pending',
    };

    if (type === 'picture') {
      const { uri, width, height } = image;
      message = { ...message, pictureUrl: uri, pictureWidth: width, pictureHeight: height };
    }

    runInAction(() => {
      this.messages = [message, ...this.messages];
    });
  }

  async sendMessage({ text }: { text: string }) {
    try {
      const messageKey = nanoid(10);
      const roomName = this.currentRoomName;

      this.addPendingMessage({ messageKey, text, type: 'text' });

      const message = await ChatService.sendMessage({ roomName, text, key: messageKey });
      return message;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async sendPictureMessage({ image, text, inGallery }: { image: TakePictureResponse; text?: string; inGallery: boolean }) {
    try {
      const roomName = this.currentRoomName;
      const messageKey = nanoid(10);

      this.addPendingMessage({
        messageKey,
        text,
        type: 'picture',
        image,
      });

      const message = await ChatService.sendPictureMessage({ roomName, image, text, inGallery, key: messageKey });
      return message;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteMessage(messageKey: string) {
    try {
      const roomName = this.currentRoomName;
      await ChatService.deleteMessage({ roomName, messageKey });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default ChatStore;
