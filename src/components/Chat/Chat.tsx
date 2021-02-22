import React, { useState, useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Box, PostBox } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import InputToolbar from './InputToolbar';

/**
 * Notes:
 *  - There's a strange behaviour with flex on `KeyboardAvoidingView`:
 *    Whenever if we set it directly (like it is now), it works fine on Android when the keyboard is open - but it's not an actual prop on the component.
 *    When we use it as a `style` prop, Android not displaying the InputToolbar.
 */

type ChatProps = {
  onSend: (message: string) => void;
  messages: Array;
};

function Chat({ messages, onSend }: ChatProps) {
  const { feedStore } = useStore();
  const flatListRef = useRef<FlatList>(null);

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ marginTop: 10 }}
        data={messages}
        inverted={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostBox message={item} />}
        initialNumToRender={2}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        showsVerticalScrollIndicator={false}
      />
      <InputToolbar onSend={onSend} scrollToFirstMessage={() => flatListRef.current?.scrollToIndex({ index: 0 })} />
    </KeyboardAvoidingView>
  );
}

export default observer(Chat);
