import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import { useStore } from '../../stores';
import { useNavigation } from '@react-navigation/native';

import Composer from './Composer';
import Camera from './Camera';
import Send from './Send';

function InputToolbar() {
  const { chatStore, checkInStore } = useStore();
  const navigation = useNavigation();
  const [keyboardShown, setKeyboardShown] = useState(false);

  const onMessageSend = (text: string) => {
    Keyboard.dismiss();
    chatStore.sendMessage({ text });
  };

  const onImageUpload = ({ imageUri, text, inGallery }: { imageUri: string; text?: string; inGallery: boolean }) => {
    chatStore.sendPictureMessage({ imageUri, text, inGallery });
    navigation.goBack();
  };

  const openCamera = () => {
    navigation.navigate('ChatImageUpload', { onImageUpload, showGallerySwitch: true });
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
      {checkInStore.lastCheckIn?.privacySetting !== 'PUBLIC' && (
        <Box justifyContent="center" zIndex={10} style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.75)' }]}>
          <Box alignItems="center" marginBottom="m">
            <Text variant="text" fontSize={14.5} color="lightText" opacity={0.85}>
              הגדרת הפרטיות שנבחרה לא מאפשרת לכתוב בצ’אט.
            </Text>
            <Text variant="text" fontSize={14.5} color="lightText" opacity={0.85}>
              אנחנו עובדים על אפשרות להשתתפות אנונימית.
            </Text>
          </Box>
        </Box>
      )}
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
