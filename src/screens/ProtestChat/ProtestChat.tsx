import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Chat, Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProtestChatProps } from '@types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const ProtestChatTitle = () => {
  return (
    <Box alignItems="center">
      <Text variant="navigationHeaderTitle" fontSize={20} marginBottom="xxs">
        בלפור
      </Text>
      <Text variant="smallText" color="lightText" fontWeight="600">
        232 מפגינים
      </Text>
    </Box>
  );
};

function ProtestChat({ navigation, route }: ProtestChatProps) {
  const insets = useSafeAreaInsets();
  const { chatStore } = useStore();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerStyle: { height: 60 + insets.top, elevation: 4 },
      // headerTitle: ProtestChatTitle,
      headerTitle: 'בלה',
    });
  }, [navigation]);

  useEffect(() => {
    if (chatStore.messages.length === 0) {
      chatStore.getMessages(Date.now());
    }

    chatStore.turnOnMessagesListener();

    return () => {
      // chatStore.turnOffMessageListener();
    };
  }, [chatStore]);

  const fetchMoreMessages = () => {
    const { messages } = chatStore;
    if (messages.length !== 0) {
      const lastMessageTimestamp = messages[messages.length - 1].createdAt - 1; // Reducing 1 so it won't get the message
      chatStore.getMessages(lastMessageTimestamp);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#161c22" />
      <Chat messages={chatStore.messages} fetchMoreMessages={fetchMoreMessages} />
    </>
  );
}

export default observer(ProtestChat);
