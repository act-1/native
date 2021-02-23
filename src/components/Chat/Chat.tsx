import React, { useState, useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { PostBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ImageViewer } from '..';

import InputToolbar from './InputToolbar';

/**
 * Notes:
 *  - There's a strange behaviour with flex on `KeyboardAvoidingView`:
 *    Whenever if we set it directly (like it is now), it works fine on Android when the keyboard is open - but it's not an actual prop on the component.
 *    When we use it as a `style` prop, Android not displaying the InputToolbar.
 */

type ChatProps = {
  messages: Array;
};

function Chat({ messages, onSend }: ChatProps) {
  const { userStore } = useStore();
  const flatListRef = useRef<FlatList>(null);

  const [imageViewerVisiblity, setViewerVisibility] = useState(false);
  const [currentPictureUrl, setPictureUrl] = useState('');

  const selectPicture = (imageUrl: string) => {
    setPictureUrl(imageUrl);
    setViewerVisibility(true);
  };

  useEffect(() => {
    if (messages.length > 0 && messages[0].authorId === userStore.user?.uid) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 0 });
      }, 50);
    }
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
        contentContainerStyle={{ marginTop: 10, paddingBottom: 15 }}
        data={messages}
        inverted={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostBox message={item} onPicturePress={selectPicture} />}
        initialNumToRender={2}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        showsVerticalScrollIndicator={false}
      />
      <InputToolbar scrollToFirstMessage={() => null} />
    </KeyboardAvoidingView>
  );
}

export default observer(Chat);
