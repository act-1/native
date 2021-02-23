import React, { useState } from 'react';
import { StyleSheet, Platform, TextInput, TextStyle, TextInputContentSizeChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '../../components';

type ComposerProps = {
  ActionComponent: ({ text, resetText }: { text: string; resetText: () => void }) => JSX.Element;
  textInputStyle?: TextStyle;
  keyboardShown?: boolean;
};

function Composer({ ActionComponent, textInputStyle, keyboardShown }: ComposerProps) {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const textInputRadius = React.useMemo(() => {
    if (inputHeight > 35) {
      return 20;
    }
    return 50;
  }, [inputHeight]);

  // Change input border radius according the input height (text lines)
  const onContentSizeChange = ({ nativeEvent }: { nativeEvent: TextInputContentSizeChangeEventData }) => {
    setInputHeight(nativeEvent.contentSize.height);
  };

  return (
    <Box
      flexDirection="row"
      paddingHorizontal="m"
      style={{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: keyboardShown ? 52 : insets.bottom + 12,
        elevation: 3,
      }}
    >
      <TextInput
        multiline={true}
        autoCorrect={false}
        selectionColor={Platform.select({ ios: '#f0f2f5', android: undefined })}
        enablesReturnKeyAutomatically
        keyboardAppearance="dark"
        value={text}
        placeholder="הודעה חדשה"
        placeholderTextColor="grey"
        onChangeText={(newText) => {
          setText(newText);
        }}
        onContentSizeChange={onContentSizeChange}
        style={[styles.textInput, { borderRadius: textInputRadius }, textInputStyle]}
      />
      <ActionComponent text={text} resetText={() => setText('')} />
    </Box>
  );
}

export default Composer;

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
