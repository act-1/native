import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Keyboard, Platform, KeyboardAvoidingView, Pressable } from 'react-native';
import { CapturePictureProps } from '@types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Box, CircularButton } from '..';
import TouchableScale from 'react-native-touchable-scale';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import Composer from '../Chat/Composer';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CapturePicture({ route }: CapturePictureProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [keyboardShown, setKeyboardShown] = useState(false);
  const cameraRef = React.useRef<RNCamera>(null);
  const [currentPicture, setCurrentPicture] = useState<TakePictureResponse | undefined>(undefined);

  const closeButtonPress = () => {
    if (currentPicture) {
      Keyboard.dismiss();
      setCurrentPicture(undefined);
    } else {
      navigation.goBack();
    }
  };

  const takePicture = async () => {
    try {
      const image = await cameraRef.current?.takePictureAsync({ quality: 1 });
      console.log(image);
      setCurrentPicture(image);
    } catch (err) {
      console.error(err);
    }
  };

  const onSendPress = () => {
    alert(1);
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
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Box position="absolute" top={insets.top} left={5} zIndex={10}>
        <CircularButton iconName={currentPicture ? 'x' : 'arrow-right'} color="white" transparent onPress={closeButtonPress} />
      </Box>

      {currentPicture ? (
        <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
          <Image source={{ uri: currentPicture.uri }} style={styles.imageStyle} />
        </Pressable>
      ) : (
        <RNCamera ref={cameraRef} style={styles.camera} captureAudio={false} useNativeZoom={true} />
      )}

      <Box position="absolute" bottom={50} alignItems="center" width="100%">
        {currentPicture ? (
          <Box
            style={[
              styles.composerContainer,
              { bottom: keyboardShown ? 115 + insets.bottom : -50, marginBottom: keyboardShown ? 64 : 0 },
            ]}
          >
            <Composer
              textInputStyle={{ backgroundColor: 'transparent', borderColor: '#696969' }}
              actionComponent={<CircularButton size="small" iconName="arrow-left" color="blue" onPress={onSendPress} />}
            />
          </Box>
        ) : (
          <TouchableScale activeScale={1.1} onPress={takePicture}>
            <Box style={styles.captureButton}></Box>
          </TouchableScale>
        )}
      </Box>
    </KeyboardAvoidingView>
  );
}

const hasNotch = DeviceInfo.hasNotch();

export default CapturePicture;
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
    height: '100%',
  },
  composerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
