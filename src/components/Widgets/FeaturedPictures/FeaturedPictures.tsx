import React, { useState, useRef } from 'react';
import { Modal, Dimensions, ViewStyle } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, CircularButton } from '../..';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import FeaturedPictureBox from './FeaturedPictureBox';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { IPicturePost } from '@types/post';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

type EventsWidgetProps = {
  style?: ViewStyle;
};

function FeaturedPictures({ style }: EventsWidgetProps) {
  const { exploreStore } = useStore();
  const [displayGallery, setDisplayGallery] = useState(false);
  const [galleryImageIndex, setImageIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);
  const insets = useSafeAreaInsets();

  const imageUrls = React.useMemo(
    () =>
      exploreStore.featuredPictures.map((item: IPicturePost) => ({
        url: item.pictureUrl,
      })),
    [exploreStore.featuredPictures]
  );

  const onPicturePress = (index: number) => {
    setImageIndex(index);
    console.log(index);
    setDisplayGallery(true);
    analytics().logEvent('pictures_widget_picture_press', { picture_idnex: index + 1 });
  };

  const onGalleryChange = (index: number | undefined) => {
    if (index) {
      carouselRef.current?.snapToItem(index);
    }
  };

  return (
    <Box style={style}>
      <Modal visible={displayGallery} transparent={true} onRequestClose={() => setDisplayGallery(false)} animationType="slide">
        <ImageViewer
          imageUrls={imageUrls}
          useNativeDriver={true}
          index={galleryImageIndex}
          enableSwipeDown={true}
          swipeDownThreshold={35}
          saveToLocalByLongPress={false}
          onChange={onGalleryChange}
          onCancel={() => setDisplayGallery(false)}
        />
        <Box position="absolute" top={insets.top + 20} left={15}>
          <CircularButton onPress={() => setDisplayGallery(false)} iconName="x" color="white" size="large" />
        </Box>
      </Modal>

      <Carousel
        ref={carouselRef}
        data={exploreStore.featuredPictures}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={5200}
        loop={true}
        renderItem={({ item, dataIndex }, parallaxProps) => (
          <FeaturedPictureBox {...item} parallaxProps={parallaxProps} onPress={() => onPicturePress(dataIndex)} />
        )}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
      />
    </Box>
  );
}

export default observer(FeaturedPictures);
