import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import Swiper from 'react-native-swiper';

const imageUrl =
  'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F';
const imageUrl2 =
  'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/121625459_10158626258252403_3420718991340997508_n.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=dueHouhiukIAX_9Kyd_&_nc_ht=scontent-arn2-1.xx&oh=5232e56d892e3a59dab088f6bdca1e9b&oe=601F8402';
const imageUrl3 =
  'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/120761421_1034916866946599_3790304360353335176_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=LEZICWsio_8AX_ZbAXN&_nc_ht=scontent-arn2-1.xx&oh=a4d8f08cca6e829469aa923e857b2c93&oe=6021A54A';
const imageUrl4 = 'https://pbs.twimg.com/profile_images/1264796012561993729/a4udzU9p_400x400.jpg';

function LocationProfilePictures({ style }: { style: ViewStyle }) {
  return (
    <View style={[style, { width: '100%' }]}>
      <Box height={110}>
        <Swiper showsPagination={false} autoplay={true} horizontal={true} scrollEnabled={false}>
          <Box alignItems="center" justifyContent="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl }} style={styles.profilePic} />
              <Text color="primaryText">גיא טפר</Text>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl2 }} style={styles.profilePic} />
              <Text color="primaryText">חן יצחקי</Text>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl3 }} style={styles.profilePic} />
              <Text color="primaryText">שושקה</Text>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl4 }} style={styles.profilePic} />
              <Text color="primaryText">גונן בן יצחק</Text>
            </Box>
          </Box>
        </Swiper>
      </Box>
    </View>
  );
}

export default LocationProfilePictures;

const styles = StyleSheet.create({
  profilePic: {
    width: 70,
    height: 70,
    marginBottom: 8,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
});

/* <Box flexDirection="row" justifyContent="center" marginBottom="xm">
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <FastImage
          source={{
            uri:
              'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
          }}
          style={styles.profilePic}
        />
        <Box style={styles.profilePic} backgroundColor="subText" />
      </Box> */
