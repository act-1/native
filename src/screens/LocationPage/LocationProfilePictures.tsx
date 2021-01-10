import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import Swiper from 'react-native-swiper';

const imageUrl =
  'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F';

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
          <Box justifyContent="space-around" alignItems="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl }} style={styles.profilePic} />
              <Text color="primaryText">גיא טפר</Text>
            </Box>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <Box paddingTop="m" justifyContent="center" alignItems="center">
              <FastImage source={{ uri: imageUrl }} style={styles.profilePic} />
              <Text color="primaryText">גיא טפר</Text>
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
    width: 55,
    height: 55,
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
