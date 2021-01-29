import React, { useState, useRef } from 'react';
import { Modal, StyleSheet, Dimensions } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { Box, Text, CircularButton } from '../../../../components';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import FeaturedPictureBox from './FeaturedPictureBox';

const { width: screenWidth } = Dimensions.get('window');

const images = [
  {
    url: 'https://media.reshet.tv/image/upload/t_main_image_article,f_auto,q_auto/v1596087348/protst1_j79xag.png',
  },
  {
    url: 'https://placekitten.com/1980/1020',
  },
  {
    url: 'https://images1.calcalist.co.il/PicServer3/2020/10/01/1024583/Moti_Ka_AI5I1968_l.jpg',
  },
  {
    url: 'https://a7.org/pictures/812/812280.jpg',
  },
];

type EventsWidgetProps = {
  style?: ViewStyle;
};

function FeaturedPictures({ style }) {
  const carouselRef = useRef<Carousel<any>>(null);
  const [displayGallery, setDisplayGallery] = useState(false);
  const [galleryImageIndex, setImageIndex] = useState(0);

  const onPicturePress = (index: number) => {
    setImageIndex(index);
    setDisplayGallery(true);
    analytics().logEvent('pictures_widget_picture_press', { picture_idnex: index + 1 });
  };

  const onGalleryChange = (index: number) => {
    carouselRef.current?.snapToItem(index);
  };

  return (
    <Box style={style}>
      <Modal visible={displayGallery} transparent={true} animationType="slide">
        <ImageViewer
          renderIndicator={() => null}
          imageUrls={images}
          useNativeDriver={true}
          index={galleryImageIndex}
          enableSwipeDown={true}
          swipeDownThreshold={35}
          saveToLocalByLongPress={false}
          onChange={onGalleryChange}
          onCancel={() => setDisplayGallery(false)}
        />
        <Box position="absolute" top={35} left={15}>
          <CircularButton onPress={() => setDisplayGallery(false)} iconName="x" color="white" size="large" />
        </Box>
      </Modal>

      <Carousel
        ref={carouselRef}
        data={images}
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

export default FeaturedPictures;
