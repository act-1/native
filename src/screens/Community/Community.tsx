import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Box, Text } from '../../components';
import CommunityStats from './CommunityStats';
import LiveLocationBox from './LiveLocationBox';

const Community = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <CommunityStats />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות אחרונות
      </Text>

      <Box paddingHorizontal="m" marginBottom="l">
        <Box flexDirection="row" marginBottom="m">
          <Image
            style={[styles.latestPicture, { flex: 0.63, height: 236 }]}
            source={{
              uri: 'https://res.cloudinary.com/onekm/image/upload/v1604302954/weekend_pictures/31-10-2020/balfur_mm.jpg',
            }}
          />
          <Box flex={0.37}>
            <Image
              style={[styles.latestPicture, { height: 112, marginLeft: 12, marginBottom: 12 }]}
              source={{
                uri:
                  'https://res.cloudinary.com/onekm/image/upload/v1604615196/protest_pictures/eoLv9Kb4x3sFBcAkcdMh/2020-11-06/43NNNdgVmB1GJmL9tFN_L.jpg',
              }}
            />
            <Image
              style={[styles.latestPicture, { height: 112, marginLeft: 12 }]}
              source={{
                uri: 'https://res.cloudinary.com/onekm/image/upload/v1604256862/weekend_pictures/31-10-2020/pinkfront.jpg',
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

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginBottom="xm">
        הפגנות בשבוע האחרון
      </Text>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginBottom: 24 }}>
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1611924820/event_thumbs/142885280_200352405168257_4781714021866219893_n_xr9xyp.jpg"
          city="תל אביב"
          locationName="כיכר דיזינגוף"
          attendingCount={432}
        />
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216320/event_thumbs/131373524_176553364176153_165322839044322366_o_bqqkd0.jpg"
          city="ירושלים"
          locationName="כיכר פריז"
          attendingCount={3021}
        />
        <LiveLocationBox
          thumbnail="https://res.cloudinary.com/onekm/image/upload/v1608216629/event_thumbs/herzeliya-19-dec_zxm2fi.jpg"
          city="הרצליה"
          locationName="רחבת הסינמטק"
          attendingCount={189}
        />
      </ScrollView>
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
