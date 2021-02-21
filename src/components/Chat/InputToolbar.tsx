import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { Box } from '../../components';
import { useNavigation } from '@react-navigation/native';

import Composer from './Composer';
import Camera from './Camera';
import Send from './Send';

type ToolbarProps = {
  onSend: (message: string) => void;
};

function InputToolbar({ onSend }: ToolbarProps) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [keyboardShown, setKeyboardShown] = useState(false);

  const onTextChange = (newText: string) => {
    setText(newText);
  };

  const onSendPress = () => {
    onSend(text);

    setText('');
    Keyboard.dismiss();
  };

  const openCamera = () => {
    navigation.navigate('ChatImageUpload');
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
    <Box backgroundColor="seperator" style={{ marginBottom: keyboardShown ? 64 : 0 }}>
      <Composer
        onTextChange={onTextChange}
        actionComponent={
          <Box flexDirection="row">
            {text.length === 0 ? <Camera onPress={openCamera} /> : <Send onSend={onSendPress} disabled={text.length === 0} />}
          </Box>
        }
      />
    </Box>
  );
}

export default InputToolbar;

const styles = StyleSheet.create({});
