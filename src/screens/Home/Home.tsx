import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text, CircularButton } from '../../components';
import { Modal, StatusBar, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import Stats from './Widgets/Stats';
import FeaturedEvents from './Widgets/FeaturedEvents';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
  {
    url: 'https://placekitten.com/300/300',
  },
  {
    url: 'https://placekitten.com/600/300',
  },
];

function Home() {
  const [displayGallery, setDisplayGallery] = useState(false);

  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
      <Box paddingHorizontal="m" marginTop="m">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
      </Box>
      <FeaturedEvents />
      <Box paddingHorizontal="m" marginTop="m">
        <Text variant="largeTitle" color="lightText">
          תמונות נבחרות
        </Text>
      </Box>
      <Button title="hiellow" onPress={() => setDisplayGallery(true)} />

      <Modal visible={displayGallery} transparent={true} animationType="slide">
        <ImageViewer
          renderIndicator={() => null}
          imageUrls={images}
          useNativeDriver={true}
          index={0}
          enableSwipeDown={true}
          swipeDownThreshold={35}
          saveToLocalByLongPress={false}
          onCancel={() => setDisplayGallery(false)}
        />
        <Box position="absolute" top={35} left={15}>
          <CircularButton onPress={() => setDisplayGallery(false)} iconName="x" color="white" size="large" />
        </Box>
      </Modal>
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
});
