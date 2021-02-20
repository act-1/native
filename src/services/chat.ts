import { RealtimeDatabase } from '@services/databaseWrapper';
import database from '@react-native-firebase/database';

type SendMessageProps = {
  roomName: string;
  text: string;
};

async function sendMessage({ roomName, text }) {
  try {
    const message = await RealtimeDatabase.database.ref('/chat/rooms').child(roomName).set({
      authorId: 123,
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
