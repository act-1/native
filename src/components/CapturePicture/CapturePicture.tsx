import React, { useState, useEffect } from 'react';

import { StyleSheet, Switch, Image, Keyboard, Platform, KeyboardAvoidingView, Dimensions, Pressable } from 'react-native';
import { Box, Text, CircularButton } from '..';
import Composer from '../Chat/Composer';
import HapticFeedback from 'react-native-haptic-feedback';
import { CameraScreen } from 'react-native-camera-kit';

import { getImageSize } from '@services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CapturePictureProps } from '@types/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const deviceWidth = Dimensions.get('window').width;

function CapturePicture({ navigation, route }: CapturePictureProps) {
  const insets = useSafeAreaInsets();

  const [keyboardShown, setKeyboardShown] = useState(false);
  const [currentPicture, setCurrentPicture] = useState<{ uri: string; width: number; height: number } | undefined>(undefined);
  const [inGallery, setInGallery] = useState(true);

  const takePicture = async (event: any) => {
    HapticFeedback.trigger('impactHeavy');
    const uri = event.image.uri;
    const { width, height } = await getImageSize(uri);

    const picture = { uri, width, height };
    setCurrentPicture(picture);
  };

  const onSendPress = (text?: string) => {
    const { onImageUpload } = route.params;
    AsyncStorage.setItem('inGallerySetting', `${inGallery}`);

    if (currentPicture && onImageUpload) {
      route.params.onImageUpload({ imageUri: currentPicture.uri, text, inGallery });
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('inGallerySetting').then((value) => {
      if (value === 'true' || value === 'false') {
        setInGallery(JSON.parse(value));
      }
    });
  }, []);

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
      <Box
        position="absolute"
        bottom={currentPicture ? undefined : insets.bottom + 30}
        top={currentPicture ? 30 : undefined}
        left={5}
        zIndex={10}
      >
        <CircularButton iconName={'arrow-right'} color="white" transparent onPress={() => navigation.goBack()} />
      </Box>

      {currentPicture ? (
        <Pressable style={{ flex: 1, justifyContent: 'center' }} onPress={() => Keyboard.dismiss()}>
          <Image
            source={{ uri: currentPicture.uri }}
            style={[{ height: currentPicture.height / (currentPicture.width / deviceWidth) }, styles.imageStyle]}
          />
        </Pressable>
      ) : (
        // <RNCamera ref={cameraRef} style={styles.camera} captureAudio={false} useNativeZoom={true} />

        <CameraScreen
          flashImages={{
            on: require('@assets/camera_screen/flashOn.png'),
            off: require('@assets/camera_screen/flashOff.png'),
            auto: require('@assets/camera_screen/flashAuto.png'),
          }}
          cameraFlipImage={require('@assets/camera_screen/cameraFlipIcon.png')}
          captureButtonImage={require('@assets/camera_screen/cameraButton.png')}
          onBottomButtonPressed={takePicture}
          saveToCameraRoll={false}
        />
      )}

      <Box position="absolute" bottom={50} alignItems="center" width="100%">
        {currentPicture && (
          <Box
            style={[
              styles.composerContainer,
              { bottom: keyboardShown ? 115 + insets.bottom : -50, marginBottom: keyboardShown ? 64 : 0 },
            ]}
          >
            {route.params?.showGallerySwitch && (
              <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginHorizontal="m" marginVertical="m">
                <Text variant="boxTitle" marginLeft="m">
                  הוספה לגלריית ההפגנה
                </Text>
                <Switch ios_backgroundColor="#39383c" onValueChange={setInGallery} value={inGallery} />
              </Box>
            )}
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
  },
  composerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
