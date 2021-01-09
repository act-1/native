import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton } from '../../components/Buttons';

function LocationProfilePictures() {
  return (
    <Box paddingHorizontal="m" alignItems="center" width="100%">
      <Box backgroundColor="seperator" height={2} width={500} marginBottom="s" />
      <Box flexDirection="row" width={'100%'}>
        <Text variant="boxTitle" color="lightText" textAlign="left" fontWeight="500" marginBottom="s">
          מי בהפגנה?
        </Text>
      </Box>
      <Box backgroundColor="seperator" height={2} width={500} marginBottom="m" />
      {/* <ScrollView> */}
      <Box flexDirection="row" justifyContent="center" flexWrap="wrap" marginBottom="xm">
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
        <Box>
          <Image
            source={{
              uri:
                'https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=6LuPPfvXqo8AX9ci1Nn&_nc_ht=scontent.ftlv16-1.fna&oh=361688c0db337630e209b75f4cd1193d&oe=601F2B7F',
            }}
            style={styles.profilePic}
          />
        </Box>
      </Box>
      <RoundedButton text="הוספת תמונת פרופיל" color="blue" size="small" textStyle={{ fontSize: 14 }} />
      {/* </ScrollView> */}
    </Box>
  );
}

export default LocationProfilePictures;

const styles = StyleSheet.create({
  profilePic: {
    width: 60,
    height: 60,
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 50,
  },
});
