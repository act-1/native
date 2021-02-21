import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { ChatImageUploadProps } from '@types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, CircularButton } from '../';

import { RNCamera } from 'react-native-camera';

function ChatImageUpload({ route }: ChatImageUploadProps) {
  const navigation = useNavigation();
  return (
    <Box style={styles.container}>
      <Box position="absolute" top={50} zIndex={10}>
        <CircularButton iconName="x" color="white" transparent onPress={navigation.goBack} />
      </Box>
      <RNCamera style={styles.camera} captureAudio={false} useNativeZoom={true} />
    </Box>
  );
}

export default ChatImageUpload;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
