import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { RealtimeDatabase } from '@services/databaseWrapper';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { chunkArray } from '@utils/array-utils';
import { Box, Text, Ticker, FadeInOutView } from '../';
import { useStore } from '../../stores';
import Icon from 'react-native-vector-icons/Feather';

const deviceWidth = Dimensions.get('window').width;

type LocationCounterProps = { locationId: string; variant: 'small' | 'large'; style?: ViewStyle };

function LocationCounter({ locationId, variant = 'small', style }: LocationCounterProps) {
  const { userStore, liveStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [checkIns, setCheckIns] = useState<RTDBCheckIn[]>([]);
  const carouselRef = useRef<Carousel<RTDBCheckIn>>(null);

  // Subscribe to location count & public check ins
  useEffect(() => {
    // TODO: Filter by createdAt property
    const checkInsQuery = RealtimeDatabase.database.ref(`/checkIns/${locationId}`).orderByChild('isActive').equalTo(true);

    checkInsQuery.once('value', () => {
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

    return () => {
      checkInsQuery.off();
    };
  }, [locationId]);

  if (isLoading) {
    return (
      <Box justifyContent="center" alignItems="center" height={105} style={style}>
        <ActivityIndicator size="small" color="grey" />
      </Box>
    );
  }

  if (!isLoading && !liveStore.locationsCount[locationId]) {
    return null;
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

  let counterComponent = null;

  if (variant === 'small') {
    counterComponent = (
      <FadeInOutView style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
        <Ticker textStyle={{ fontSize: 16, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#eb524b' }}>
          {liveStore.locationsCount[locationId]}
        </Ticker>
        <Text variant="text" fontFamily="AtlasDL3.1AAA-Bold" color="primaryColor" marginLeft="xs">
          מפגינים עכשיו
        </Text>
      </FadeInOutView>
    );
  } else {
    counterComponent = (
      <Box alignItems="center" marginBottom="m" minHeight={105}>
        <Ticker textStyle={{ fontSize: 54, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#ededed' }}>
          {liveStore.locationsCount[locationId]}
        </Ticker>
        <Text variant="extraLargeTitle">מפגינים עכשיו</Text>
      </Box>
    );
  }

  return (
    <View style={[{ width: '100%', paddingVertical: 12 }, style]}>
      {counterComponent}

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
