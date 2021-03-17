import React, { useState, useEffect } from 'react';

import { StyleSheet, Switch, Image, Keyboard, Platform, KeyboardAvoidingView, Dimensions, Pressable } from 'react-native';
import { Box, Text, CircularButton } from '@components/';
import Composer from '../Chat/Composer';

import HapticFeedback from 'react-native-haptic-feedback';

import { UploadPreviewProps } from '@types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImagePickerResponse } from 'react-native-image-picker';
const deviceWidth = Dimensions.get('window').width;

function UploadPreview({ navigation, route }: UploadPreviewProps) {
  const insets = useSafeAreaInsets();

  const [keyboardShown, setKeyboardShown] = useState(false);
  const [image, setImage] = useState<ImagePickerResponse>({});

  const onSendPress = (text?: string) => {
    // const { onImageUpload } = route.params;
    // if (currentPicture && onImageUpload) {
    //   route.params.onImageUpload({ imageUri: currentPicture.uri, text, inGallery });
    // }
  };

  useEffect(() => {
    if (route?.params?.image) {
      setImage(route.params.image);
    }
  }, [route]);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', () => setKeyboardShown(true));
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => setKeyboardShown(false));

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardShowListener);
      Keyboard.removeListener('keyboardWillHide', keyboardHideListener);
    };
  }, []);

  const ActionComponent = ({ text }: { text: string }) => (
    <CircularButton size="small" iconName="arrow-left" color="blue" onPress={() => onSendPress(text)} />
  );

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Box position="absolute" top={30} left={5} zIndex={10}>
        <CircularButton iconName={'arrow-right'} color="white" transparent onPress={() => navigation.goBack()} />
      </Box>

      <Pressable style={{ flex: 1, justifyContent: 'center' }} onPress={() => Keyboard.dismiss()}>
        <Image source={{ uri: image.uri }} style={[{ height: image.height / (image.width / deviceWidth) }, styles.imageStyle]} />
      </Pressable>

      <Box position="absolute" bottom={50} alignItems="center" width="100%">
        {image && (
          <Box
            style={[
              styles.composerContainer,
              { bottom: keyboardShown ? 115 + insets.bottom : -50, marginBottom: keyboardShown ? 64 : 0 },
            ]}
          >
            <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginHorizontal="m" marginVertical="m">
              <Text variant="boxTitle" marginLeft="m">
                הוספה לגלריית ההפגנה
              </Text>
              <Switch ios_backgroundColor="#39383c" onValueChange={} value={} />
            </Box>
            <Composer
              textInputStyle={{ backgroundColor: 'transparent', borderColor: '#696969' }}
              ActionComponent={ActionComponent}
            />
          </Box>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
}

export default UploadPreview;
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderColor: '#d6d6d6',
    borderWidth: 2,
    borderRadius: 50,
  },
  imageStyle: {
    width: '100%',
  },
  composerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
