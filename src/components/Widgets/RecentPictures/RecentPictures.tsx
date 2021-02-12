import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../..';
import { useNavigation } from '@react-navigation/native';

function LatestPictures() {
  const navigation = useNavigation();

  return (
    <Box paddingHorizontal="m" marginBottom="l">
      <Box flexDirection="row" marginBottom="m">
        <FastImage
          style={[styles.latestPicture, { flex: 0.63, height: 236 }]}
          source={{
            uri: 'https://www.activestills.org/media-lib/main_image45426_medium.jpg',
          }}
        />
        <Box flex={0.37}>
          <FastImage
            style={[styles.latestPicture, { height: 112, marginLeft: 12, marginBottom: 12 }]}
            source={{
              uri: 'https://www.activestills.org/media-lib/main_image44730_medium.jpg',
            }}
          />
          <FastImage
            style={[styles.latestPicture, { height: 112, marginLeft: 12 }]}
            source={{
              uri: 'https://www.activestills.org/media-lib/main_image8159_medium.jpg',
            }}
          />
        </Box>
      </Box>
      <Box flexDirection="row" flex={1}>
        <FastImage
          style={[styles.latestPicture, { flex: 0.9, height: 112 }]}
          source={{
            uri: 'https://www.activestills.org/media-lib/main_image30529_medium.jpg',
          }}
        />
        <FastImage
          style={[styles.latestPicture, { flex: 0.9, height: 112, marginLeft: 12 }]}
          source={{
            uri:
              'https://res.cloudinary.com/onekm/image/upload/v1604615281/protest_pictures/eoLv9Kb4x3sFBcAkcdMh/2020-11-06/U0Pfwm_eVuiaP7H7XtS84.jpg',
          }}
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
