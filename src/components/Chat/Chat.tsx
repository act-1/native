import React, { useState, useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { PostBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ImageViewer } from '..';
import { ChatMessage } from '@types/collections';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InputToolbar from './InputToolbar';

/**
 * Notes:
 *  - There's a strange behaviour with flex on `KeyboardAvoidingView`:
 *    Whenever if we set it directly (like it is now), it works fine on Android when the keyboard is open - but it's not an actual prop on the component.
 *    When we use it as a `style` prop, Android not displaying the InputToolbar.
 */

type ChatProps = {
  messages: ChatMessage[];
  fetchMoreMessages: () => void;
};

function Chat({ messages, fetchMoreMessages }: ChatProps) {
  const { userStore, chatStore } = useStore();
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);

  // We use local state so we can compare it to the messages prop and act accordingly.
  const [listMessages, setListMessages] = useState<ChatMessage[]>([]);

  const [imageViewerVisiblity, setViewerVisibility] = useState(false);
  const [currentPictureUrl, setPictureUrl] = useState('');

  const selectPicture = (imageUrl: string) => {
    setPictureUrl(imageUrl);
    setViewerVisibility(true);
  };

  const deleteMessage = (messageKey: string) => {
    Alert.alert(
      'מחיקת הודעה',
      'ההודעה תמחק לצמיתות',
      [
        {
          text: 'מחיקה',
          onPress: () => chatStore.deleteMessage(messageKey),
          style: 'destructive',
        },
        {
          text: 'ביטול',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // Set messages initially
    // if (messages.length > 0 && listMessages.length === 0) {
    //   setListMessages(messages);
    // }

    // If new messages have been added by the user, refresh the list and scroll to the new message.
    if (messages.length > 0 && messages[0].authorId === userStore.user?.uid) {
      // Delay scroll to prevent cases where FlatList updates list after scroll
      setListMessages(messages);
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0 });
      }, 50);
    } else {
      // Otherwise, just update the list
      setListMessages(messages);
    }

    // If messages are updated, with no new messages - just refresh the list.
    // if (messages.length > 0 && messages.length === listMessages.length) {
    //   setListMessages(messages);
    // }
  }, [messages]);

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageViewer
        isVisible={imageViewerVisiblity}
        setViewerVisiblity={(isVisible) => setViewerVisibility(isVisible)}
        imageUrl={currentPictureUrl}
      />

      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ marginTop: 10, paddingBottom: Platform.select({ ios: 60 + insets.top, android: 0 }) }}
        data={listMessages}
        inverted={true}
        keyExtractor={(item) => item.id}
        onEndReached={fetchMoreMessages}
        renderItem={({ item }) => <PostBox message={item} onPicturePress={selectPicture} deleteMessage={deleteMessage} />}
        initialNumToRender={2}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      />
      <InputToolbar />
    </KeyboardAvoidingView>
  );
}

export default observer(Chat);
