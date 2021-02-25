import React, { useState, useRef } from 'react';
import { Modal, Dimensions, ViewStyle } from 'react-native';
import { logEvent } from '@services/analytics';
import { Box, CircularButton } from '../..';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { PicturePost } from '@types/collections';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeaturedPictureBox from './FeaturedPictureBox';
import FeaturedPicturesContentLoader from './FeaturedPicturesContentLoader';
import FastImage from 'react-native-fast-image';

const { width: screenWidth } = Dimensions.get('window');

type EventsWidgetProps = {
  style?: ViewStyle;
};

function FeaturedPictures({ style }: EventsWidgetProps) {
  const { mediaStore } = useStore();
  const [displayGallery, setDisplayGallery] = useState(false);
  const [galleryImageIndex, setImageIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);
  const insets = useSafeAreaInsets();

  const imageUrls = React.useMemo(
    () =>
      mediaStore.featuredPictures.map((item: PicturePost) => ({
        url: item.pictureUrl,
      })),
    [mediaStore.featuredPictures]
  );

  const onPicturePress = (index: number) => {
    setImageIndex(index);
    setDisplayGallery(true);
    logEvent('featured_picture_press', { picture_index: index + 1 });
  };

  const onGalleryChange = (index: number | undefined) => {
    logEvent('featured_pictures_viewer_swipe', { picture_index: index + 1 });

    if (index) {
      carouselRef.current?.snapToItem(index);
    }
  };

  if (mediaStore.featuredPictures.length === 0) {
    return <FeaturedPicturesContentLoader style={style} />;
  }

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
          renderImage={(props) => (
            <FastImage
              {...props}
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: props.source.uri,
              }}
            />
          )}
        />
        <Box position="absolute" top={insets.top + 20} left={15}>
          <CircularButton onPress={() => setDisplayGallery(false)} iconName="x" color="white" size="large" transparent />
        </Box>
      </Modal>

      <Carousel
        ref={carouselRef}
        data={mediaStore.featuredPictures}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={4500}
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
