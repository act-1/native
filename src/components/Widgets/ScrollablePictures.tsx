import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import FastImage from 'react-native-fast-image';

function ScrollablePictures() {
  return (
    <Box padding="m" marginBottom="m">
      <Text variant="largeTitle" marginBottom="m">
        תמונות אחרונות
      </Text>
      <ScrollView contentContainerStyle={styles.scrollablePictures} showsHorizontalScrollIndicator={false} horizontal={true}>
        <Box marginRight="m">
          <FastImage
            source={{ uri: 'https://www.activestills.org/media-lib/main_image44433_medium.jpg?rnd=359312809' }}
            style={styles.picture}
          />
          <Text variant="boxSubtitle">לפני 12 דק'</Text>
        </Box>
        <Box marginRight="m">
          <FastImage
            source={{ uri: 'https://www.activestills.org/media-lib/main_image44401.JPG?rnd=360793779' }}
            style={styles.picture}
          />
          <Text variant="boxSubtitle">לפני 38 דק'</Text>
        </Box>
        <Box marginRight="m">
          <FastImage
            source={{ uri: 'https://www.activestills.org/media-lib/main_image44406.JPG?rnd=360793779' }}
            style={styles.picture}
          />
          <Text variant="boxSubtitle">לפני 38 דק'</Text>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default ScrollablePictures;

const styles = StyleSheet.create({
  scrollablePictures: {
    minWidth: '100%',
  },
  picture: { width: 225, height: 225, marginBottom: 4, borderRadius: 4 },
});
