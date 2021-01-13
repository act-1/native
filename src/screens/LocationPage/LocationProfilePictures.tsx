import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';
import { useStore } from '../../stores';

firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
}

const deviceWidth = Dimensions.get('window').width;

function LocationProfilePictures({ locationId, style }: { locationId: string; style?: ViewStyle }) {
  const { userStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [publicCheckIns, setPublicCheckIns] = useState<PublicCheckInParams[]>([]);
  const carouselRef = useRef<Carousel<PublicCheckInParams>>(null);
  // const [currentCheckInIndex, setCheckInIndex] = useState(0);

  // Subscribe to location count & public check ins
  useEffect(() => {
    // TODO: Filter by createdAt property
    const checkIns = database.ref(`/checkIns/${locationId}`).orderByChild('isActive').equalTo(true);

    checkIns.once('value', () => {
      setIsLoading(false);
    });

    checkIns.on('child_added', (snapshot) => {
      const checkIn = snapshot.val();
      setPublicCheckIns((prevState) => {
        if (checkIn.userId === userStore.user.uid && carouselRef?.current) {
          // Changing to previous carousel item, so the profile picture will have enough time to load,
          // and to prevent cases when the user will miss seeing their profile picture showing up initially.
          carouselRef.current.snapToItem(prevState.length - 1, false);
        }

        return [...prevState, checkIn];
      });

      console.log(userStore.user.uid, checkIn.userId);
    });

    return () => {
      checkIns.off();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <LottieView
          source={require('@assets/wave-animation.json')}
          autoPlay
          loop
          style={{ height: 100, marginTop: 6, marginBottom: 16 }}
        />
        <Text variant="text" textAlign="center" style={{ color: '#fff' }} marginBottom="xm" paddingHorizontal="m">
          אף אחד עדיין לא הצטרף לרשימת המפגינים.
        </Text>
      </Box>
    );
  }

  return (
    <View style={[style, { width: '100%' }]}>
      <Box height={110}>
        <Carousel
          ref={carouselRef}
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
