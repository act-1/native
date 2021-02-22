import React from 'react';
import { Modal } from 'react-native';
import { ImageViewer as Viewer } from 'react-native-image-zoom-viewer';
import { Box, CircularButton } from '../';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

type ImageViewerProps = {
  isVisible: boolean;
  setViewerVisiblity: (isVisible: boolean) => void;
  imageUrl: string;
};
function ImageViewer({ imageUrl, isVisible, setViewerVisiblity }: ImageViewerProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={() => setViewerVisiblity(false)} animationType="slide">
      <Viewer
        imageUrls={[{ url: imageUrl }]}
        useNativeDriver={true}
        enableSwipeDown={true}
        swipeDownThreshold={35}
        saveToLocalByLongPress={false}
        renderIndicator={() => null}
        renderImage={(props) => (
          <FastImage
            {...props}
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: props.source.uri,
              cache: 'cacheOnly',
            }}
          />
        )}
        onCancel={() => setViewerVisiblity(false)}
      />
      <Box position="absolute" top={insets.top + 20} left={15}>
        <CircularButton onPress={() => setViewerVisiblity(false)} iconName="x" size="large" color="white" transparent />
      </Box>
    </Modal>
  );
}

export default ImageViewer;
