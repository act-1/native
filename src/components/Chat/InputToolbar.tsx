import React, { useState, useEffect } from 'react';
import { TextInput, Keyboard, StyleSheet, Platform, TextInputContentSizeChangeEventData } from 'react-native';
import { Box } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Send from './Send';

type ToolbarProps = {
  onSend: (message: string) => void;
};

function InputToolbar({ onSend }: ToolbarProps) {
  const [text, setText] = useState('');

  const [keyboardShown, setKeyboardShown] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const textInputRadius = React.useMemo(() => {
    if (inputHeight > 35) {
      return 20;
    }
    return 50;
  }, [inputHeight]);

  const onSendPress = () => {
    onSend(text);

    setText('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboardShown(true));
    Keyboard.addListener('keyboardWillHide', () => setKeyboardShown(false));

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  // Change input border radius according the input height (text lines)
  const onContentSizeChange = ({ nativeEvent }: { nativeEvent: TextInputContentSizeChangeEventData }) => {
    console.log(nativeEvent.contentSize);

    setInputHeight(nativeEvent.contentSize.height);
  };

  return (
    <Box
      flexDirection="row"
      paddingHorizontal="m"
      backgroundColor="seperator"
      style={{
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingBottom: insets.bottom + 10,
        marginBottom: keyboardShown ? 64 : 0,
        elevation: 3,
      }}
    >
      <TextInput
        multiline={true}
        selectionColor={Platform.select({ ios: '#f0f2f5', android: undefined })}
        enablesReturnKeyAutomatically
        keyboardAppearance="dark"
        value={text}
        placeholder="הודעה חדשה"
        placeholderTextColor="grey"
        onChangeText={(newText) => setText(newText)}
        onContentSizeChange={onContentSizeChange}
        style={[styles.textInput, { borderRadius: textInputRadius }]}
      />
      <Send onSend={onSendPress} disabled={text.length === 0} />
    </Box>
  );
}

export default InputToolbar;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,

    paddingTop: Platform.select({ ios: 6.25, android: 3.25 }),
    paddingBottom: Platform.select({ ios: 5.5, android: 2 }),
    paddingLeft: 18,
    paddingRight: 12,

    marginRight: 8,

    fontSize: 18,
    color: '#fff',
    textAlign: 'right',

    borderWidth: 1,
    borderColor: '#444444',
    backgroundColor: '#3b3b3b',

    elevation: 1,
  },
});
