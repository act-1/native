import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Chat } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function ProtestChat({ navigation, route }: LocationScreenProps) {
  const { chatStore } = useStore();

  useEffect(() => {
    if (chatStore.messages.length === 0) {
      chatStore.getMessages();
    }

    chatStore.turnOnMessagesListener();

    return () => {
      chatStore.turnOffMessageListener();
    };
  }, [chatStore]);

  return (
    <>
      <StatusBar backgroundColor="#161c22" />
      <Chat messages={chatStore.messages} />
    </>
  );
}

export default observer(ProtestChat);
