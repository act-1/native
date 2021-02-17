import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../..';
import { useNavigation } from '@react-navigation/native';
// import ContentLoader, { Rect } from 'react-content-loader/native';
import FastImage from 'react-native-fast-image';

function LatestPictures() {
  const navigation = useNavigation();

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Box flexDirection="row" marginBottom="m">
        <FastImage
          source={{ uri: 'https://www.activestills.org/media-lib/main_image45426_medium.jpg' }}
          style={{ flex: 0.63, height: 236 }}
        />

        <Box flex={0.37}>
          <FastImage
            source={{ uri: 'https://www.activestills.org/media-lib/main_image44730_medium.jpg' }}
            style={{ height: 112, marginLeft: 12, marginBottom: 12 }}
          />
          <FastImage
            source={{ uri: 'https://www.activestills.org/media-lib/main_image8159_medium.jpg' }}
            style={{ height: 112, marginLeft: 12 }}
          />
        </Box>
      </Box>
      <Box flexDirection="row" flex={1}>
        <FastImage
          source={{ uri: 'https://www.activestills.org/media-lib/main_image30529_medium.jpg' }}
          style={{ flex: 0.9, height: 112 }}
        />

        <FastImage
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1604615281/protest_pictures/eoLv9Kb4x3sFBcAkcdMh/2020-11-06/U0Pfwm_eVuiaP7H7XtS84.jpg',
          }}
          style={{ flex: 0.9, height: 112, marginLeft: 12 }}
        />

        <Box
          style={styles.morePicturesBox}
          flex={1}
          marginLeft="m"
          alignItems="center"
          justifyContent="center"
          borderColor="seperator"
        >
          <Text variant="boxTitle" fontSize={14} textAlign="center">
            לכל התמונות
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default LatestPictures;

const styles = StyleSheet.create({
  latestPicture: {
    borderRadius: 4,
  },
  morePicturesBox: {
    borderColor: '#222222',
    borderWidth: 2,
    borderRadius: 4,
  },
});
