import auth from '@react-native-firebase/auth';
import { RealtimeDatabase } from '@services/databaseWrapper';
import { newImagePost } from '@services/feed';
import database from '@react-native-firebase/database';
import { nanoid } from 'nanoid/non-secure';
import { PicturePost } from '@types/collections';
import { TakePictureResponse } from 'react-native-camera';

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
      type: 'text',
    });

    return message;
  } catch (err) {
    throw err;
  }
}

type SendPictureMessageProps = {
  roomName: string;
  key: string;
  image: TakePictureResponse;
  inGallery: boolean;
  text?: string;
};

/**
 * Uploads the picture, then sends a new message with the provided key.
 *
 * A key needs to be provided since we add a message object manually - before we send it to the realtime database in this function.
 *
 * Later, once the message is added and received in the `child_added` event listener, we can filter out the existing `pending` message with the actual
 * chat message node.
 */
async function sendPictureMessage(messageData: SendPictureMessageProps) {
  const { uid: authorId, displayName: authorName, photoURL: authorPicture } = auth().currentUser!;
  const { roomName, key, image, text, inGallery = true } = messageData;

  try {
    // TODO: Add location
    const post = await newImagePost({ image, textContent: text, inGallery });
    let { pictureUrl, pictureWidth, pictureHeight } = post?.data() as PicturePost;

    // Once uploaded, add the message and attach the picture url
    const message = await RealtimeDatabase.database.ref(`/chat/rooms/${roomName}`).child(`messages/${key}`).set({
      id: key,
      authorId,
      authorName: 'גיא',
      authorPicture,
      pictureUrl,
      pictureHeight,
      pictureWidth,
      text,
      type: 'picture',
      createdAt: database.ServerValue.TIMESTAMP,
    });

    return message;
  } catch (err) {
    throw err;
  }
}

export default {
  sendMessage,
  sendPictureMessage,
};
