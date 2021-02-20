import auth from '@react-native-firebase/auth';
import { RealtimeDatabase } from '@services/databaseWrapper';
import database from '@react-native-firebase/database';
import { nanoid } from 'nanoid/non-secure';

type SendMessageProps = {
  roomName: string;
  text: string;
};

async function sendMessage({ roomName, text }: SendMessageProps) {
  try {
    const { uid: authorId, displayName: authorName, photoURL: authorPicture } = auth().currentUser!;
    const key = nanoid(10);

    const message = await RealtimeDatabase.database.ref(`/chat/rooms/${roomName}`).child(`messages/${key}`).set({
      id: key,
      authorId,
      authorName: 'גיא',
      authorPicture,
      createdAt: database.ServerValue.TIMESTAMP,
      text,
    });

    return message;
  } catch (err) {
    throw err;
  }
}

export default {
  sendMessage,
};
