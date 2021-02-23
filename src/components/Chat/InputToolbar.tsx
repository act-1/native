import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Box } from '../../components';
import { useStore } from '../../stores';
import { useNavigation } from '@react-navigation/native';
import { TakePictureResponse } from 'react-native-camera';

import Composer from './Composer';
import Camera from './Camera';
import Send from './Send';

function InputToolbar() {
  const { chatStore } = useStore();
  const navigation = useNavigation();
  const [keyboardShown, setKeyboardShown] = useState(false);

  const onMessageSend = (text: string) => {
    Keyboard.dismiss();
    chatStore.sendMessage({ text });
  };

  const onImageUpload = ({ image, text }: { image: TakePictureResponse; text?: string }) => {
    chatStore.sendPictureMessage({ image, text, inGallery: true });
  };

  const openCamera = () => {
    navigation.navigate('ChatImageUpload', { onImageUpload });
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', () => setKeyboardShown(true));
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => setKeyboardShown(false));

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardShowListener);
      Keyboard.removeListener('keyboardWillHide', keyboardHideListener);
    };
  }, []);

  return (
    <Box backgroundColor="seperator">
      <Composer
        keyboardShown={keyboardShown}
        ActionComponent={({ text, resetText }: { text: string; resetText: () => void }) => (
          <Box flexDirection="row">
            {text.length === 0 ? (
              <Camera onPress={openCamera} />
            ) : (
              <Send
                onSend={() => {
                  onMessageSend(text);
                  resetText();
                }}
                disabled={text.length === 0}
              />
            )}
          </Box>
        )}
      />
    </Box>
  );
}

export default InputToolbar;

const styles = StyleSheet.create({});
