import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import Carousel from 'react-native-snap-carousel';

firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

const deviceWidth = Dimensions.get('window').width;

function LocationProfilePictures({ locationId, style }: { locationId: string; style?: ViewStyle }) {
  const [isLoading, setIsLoading] = useState(true);
  const [publicCheckIns, setPublicCheckIns] = useState<PublicCheckInParams[]>([]);
  const carousel = useRef<Carousel<PublicCheckInParams>>(null);
  // const [currentCheckInIndex, setCheckInIndex] = useState(0);

  // Subscribe to location count & public check ins
  useEffect(() => {
    // TODO: Filter by createdAt property
    const checkIns = database.ref(`/checkIns/${locationId}`).orderByChild('isActive').equalTo(true);

    checkIns.once('value', (snapshot) => {
      setIsLoading(false);
    });

    checkIns.on('child_added', (snapshot) => {
      const checkIn = snapshot.val();
      setPublicCheckIns((prevState) => [...prevState, checkIn]);
    });

    return () => {
      checkIns.off();
    };
  }, [locationId]);

  if (isLoading) {
    return (
      <Box justifyContent="center" alignItems="center" height={110} style={style}>
        <ActivityIndicator size="small" color="grey" />
      </Box>
    );
  }

  if (publicCheckIns.length === 0) {
    return (
      <Box justifyContent="center" alignItems="center" height={110} style={style}>
        <Text variant="text" textAlign="center" style={{ color: '#fff' }} marginBottom="xm" paddingHorizontal="m">
          אף אחד עדיין לא הצטרף לרשימת המפגינים הפומבית.
        </Text>
      </Box>
    );
  }

  return (
    <View style={[style, { width: '100%' }]}>
      <Box height={110}>
        <Carousel
          ref={carousel}
          data={publicCheckIns}
          autoplay={true}
          renderItem={({ item: checkIn }: { item: PublicCheckInParams }) => (
            <Box alignItems="center" justifyContent="center" key={checkIn.id}>
              <Box paddingTop="m" justifyContent="center" alignItems="center">
                <FastImage source={{ uri: checkIn.profilePicture }} style={styles.profilePic} />
                <Text color="primaryText">{checkIn.displayName}</Text>
              </Box>
            </Box>
          )}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          scrollEnabled={false}
          loop={true}
        />
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
