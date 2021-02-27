import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ActivityIndicator, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { RealtimeDatabase } from '@services/databaseWrapper';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { chunkArray } from '@utils/array-utils';
import { Box, Text, Ticker } from '../';
import { useStore } from '../../stores';
import Icon from 'react-native-vector-icons/Feather';

const deviceWidth = Dimensions.get('window').width;

function LocationCounter({ locationId, style }: { locationId: string; style?: ViewStyle }) {
  const { userStore } = useStore();
  const fadeInOut = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(true);
  const [checkIns, setCheckIns] = useState<RTDBCheckIn[]>([]);
  const [counter, setCounter] = useState<number | null>(null);
  const carouselRef = useRef<Carousel<RTDBCheckIn>>(null);

  // Counter fade in / fade out
  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(fadeInOut, {
        toValue: 0,
        duration: 1200,
        delay: 750,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInOut, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(sequence).start();
  }, [fadeInOut]);

  // Subscribe to location count & public check ins
  useEffect(() => {
    // TODO: Filter by createdAt property
    const checkInsQuery = RealtimeDatabase.database.ref(`/checkIns/${locationId}`).orderByChild('isActive').equalTo(true);
    const checkInCount = RealtimeDatabase.database.ref(`/locationCounter/${locationId}`);

    checkInsQuery.once('value', (snapshot) => {
      setIsLoading(false);
    });

    checkInsQuery.on('child_added', (snapshot) => {
      const checkIn = snapshot.val();

      setCheckIns((prevState) => {
        if (checkIn.userId === userStore.user?.uid && carouselRef?.current) {
          // Changing to previous carousel item, so the profile picture will have enough time to load,
          // and to prevent cases when the user will miss seeing their profile picture showing up initially.
          carouselRef.current.snapToItem(prevState.length - 1, false);
        }

        return [...prevState, checkIn];
      });
    });

    checkInCount.on('value', (snapshot) => {
      if (snapshot.val()) {
        const count = snapshot.val();

        // Something went wrong!
        if (count < 0) {
          crashlytics().setAttributes({ locationId });
          crashlytics().log('Check in counter is below zero.');
          return;
        }

        setCounter(snapshot.val());
      } else {
        setCounter(0);
      }

      return () => {
        checkInsQuery.off();
        checkInCount.off();
      };
    });
  }, [locationId]);

  if (isLoading) {
    return (
      <Box justifyContent="center" alignItems="center" height={110} style={style}>
        <ActivityIndicator size="small" color="grey" />
      </Box>
    );
  }

  if (!isLoading && (counter === 0 || counter === null)) {
    return (
      <Box justifyContent="center" alignItems="center" height={110} style={style} backgroundColor="greyBackground">
        <Text variant="boxTitle" textAlign="center" color="attentionBackground" marginBottom="xs" paddingHorizontal="xm">
          עכשיו בהפגנה?
        </Text>
        <Text variant="boxTitle" textAlign="center" color="attentionBackground" marginBottom="m" paddingHorizontal="xm">
          עשו צ׳ק אין!
        </Text>
        <Animated.View style={{ opacity: fadeInOut }}>
          <Icon name="chevrons-down" size={28} color="#FFC281" />
        </Animated.View>
      </Box>
    );
  }

  const chunkedCheckIns = chunkArray(checkIns, 6);

  const carouselPages = chunkedCheckIns.map((pageCheckIns: RTDBCheckIn[]) => (
    <Box flexDirection="row" justifyContent="center">
      {pageCheckIns.map((checkIn, index) => (
        <FastImage
          source={{ uri: checkIn.profilePicture }}
          style={[styles.profilePic, { marginLeft: index === 0 ? 0 : -12 }]}
          key={checkIn.createdAt}
        />
      ))}
    </Box>
  ));

  return (
    <View style={[{ width: '100%', paddingVertical: 12, backgroundColor: '#111111' }, style]}>
      <Animated.View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8, opacity: fadeInOut }}>
        <Ticker textStyle={{ fontSize: 16, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#eb524b' }}>{counter}</Ticker>
        <Text variant="text" fontFamily="AtlasDL3.1AAA-Bold" color="primaryColor" marginLeft="xs">
          מפגינים עכשיו
        </Text>
      </Animated.View>

      <Box>
        <Carousel
          ref={carouselRef}
          data={carouselPages}
          autoplay={true}
          autoplayInterval={5400}
          renderItem={({ item }) => item}
          sliderWidth={deviceWidth}
          itemWidth={deviceWidth}
          scrollEnabled={false}
          loop={true}
        />
      </Box>
    </View>
  );
}

export default LocationCounter;

const styles = StyleSheet.create({
  profilePic: {
    width: 46,
    height: 46,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#0a0d0f',
  },
});
