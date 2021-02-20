import auth from '@react-native-firebase/auth';
import { RealtimeDatabase } from '@services/databaseWrapper';
import database from '@react-native-firebase/database';

type SendMessageProps = {
  roomName: string;
  text: string;
};

async function sendMessage({ roomName, text }: SendMessageProps) {
  try {
    const { uid: authorId, displayName: authorName, photoURL: authorPicture } = auth().currentUser!;
    const message = await RealtimeDatabase.database.ref(`/chat/rooms/${roomName}`).child('messages').push({
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
