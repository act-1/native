import React, { useState, useEffect } from 'react';
import { TextInput, Keyboard, StyleSheet, Platform } from 'react-native';
import { Box } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function InputToolbar() {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => setKeyboardShown(true));
    Keyboard.addListener('keyboardWillHide', () => setKeyboardShown(false));

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  return (
    <Box
      justifyContent="flex-end"
      marginTop="s"
      paddingHorizontal="m"
      backgroundColor="seperator"
      style={{ paddingTop: 10, paddingBottom: insets.bottom + 10, marginBottom: keyboardShown ? 64 : 0 }}
    >
      <TextInput
        multiline={true}
        selectionColor={Platform.select({ ios: '#f0f2f5', android: undefined })}
        enablesReturnKeyAutomatically
        keyboardAppearance="dark"
        style={styles.textInput}
      />
    </Box>
  );
}

export default InputToolbar;

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    paddingTop: Platform.select({ ios: 8.5, android: 5.5 }),
    paddingBottom: Platform.select({ ios: 7, android: 4 }),
    paddingLeft: 18,
    paddingRight: 12,

    fontSize: 18,
    color: '#fff',

    borderRadius: 50,
    backgroundColor: '#3b3b3b',
    textAlign: 'right',
  },
});
