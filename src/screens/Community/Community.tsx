import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import CommunityStats from './CommunityStats';
import FeaturedEvents from '../Home/Widgets/FeaturedEvents';

import Icon from 'react-native-vector-icons/Feather';

const Community = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CommunityStats />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <Box paddingHorizontal="m" marginBottom="xs">
        <Box flexDirection="row" marginBottom="m">
          <Image
            style={[styles.latestPicture, { flex: 0.63, height: 236 }]}
            source={{
              uri:
                'https://res.cloudinary.com/onekm/image/upload/v1604779012/protest_pictures/voTcndBEKWlMmvvife42/2020-11-07/ki5dD4fpelCgu6la_zioG.jpg',
            }}
          />
          <Box flex={0.37}>
            <Image
              style={[styles.latestPicture, { height: 112, marginLeft: 12, marginBottom: 12 }]}
              source={{
                uri:
                  'https://res.cloudinary.com/onekm/image/upload/v1604761709/protest_pictures/Yck65gzi7B0Crgz1nzZO/2020-11-07/e97yAHZVOiUDrsZl-W3lj.jpg',
              }}
            />
            <Image
              style={[styles.latestPicture, { height: 112, marginLeft: 12 }]}
              source={{
                uri:
                  'https://res.cloudinary.com/onekm/image/upload/v1604615196/protest_pictures/eoLv9Kb4x3sFBcAkcdMh/2020-11-06/43NNNdgVmB1GJmL9tFN_L.jpg',
              }}
            />
          </Box>
        </Box>
        <Box flexDirection="row" flex={1}>
          <Image
            style={[styles.latestPicture, { flex: 0.9, height: 112 }]}
            source={{
              uri: 'https://res.cloudinary.com/onekm/image/upload/v1604304193/weekend_pictures/31-10-2020/balfur-acab_x3gvb7.jpg',
            }}
          />
          <Image
            style={[styles.latestPicture, { flex: 0.9, height: 112, marginLeft: 12 }]}
            source={{
              uri: 'https://res.cloudinary.com/onekm/image/upload/v1604302954/weekend_pictures/31-10-2020/balfur_mm.jpg',
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
    </ScrollView>
  );
};

export default Community;

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
