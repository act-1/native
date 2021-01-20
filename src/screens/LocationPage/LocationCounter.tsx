import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import crashlytics from '@react-native-firebase/crashlytics';
import FastImage from 'react-native-fast-image';
import { Box, Text, Ticker } from '../../components';

firebase.app().database().setLoggingEnabled(true);
let database = firebase.app().database('https://act1co-default-rtdb.firebaseio.com');

// TODO: Set as a default
if (__DEV__) {
  // database = firebase.app().database('http://localhost:9000/?ns=act1co');
  database = firebase.app().database('https://act1-dev-default-rtdb.firebaseio.com/');
}

function LocationCounter({ locationId, style }: { locationId: string; style?: ViewStyle }) {
  const fadeInOut = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(true);
  const [checkIns, setCheckIns] = useState<RTDBCheckIn[]>([]);
  const [counter, setCounter] = useState<number | null>(null);

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
    const checkInsQuery = database.ref(`/checkIns/${locationId}`).orderByChild('isActive').equalTo(true);
    const checkInCount = database.ref(`/locationCounter/${locationId}`);

    checkInsQuery.once('value', (snapshot) => {
      if (snapshot.val()) {
        const entries: RTDBCheckIn[] = Object.values(snapshot.val());
        setCheckIns(entries);
        setIsLoading(false);
      }
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

  // TODO: ISSUE?? FIX??
  if (counter === 0 || counter === null) {
    console.log(counter);
    return (
      <Box justifyContent="center" alignItems="center" height={110} style={style}>
        <Text variant="text" textAlign="center" marginBottom="xm" paddingHorizontal="m">
          אף אחד עדיין לא הצטרף לרשימת המפגינים.
        </Text>
      </Box>
    );
  }

  return (
    <View style={[style, { width: '100%' }]}>
      <Animated.View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8, opacity: fadeInOut }}>
        <Ticker textStyle={{ fontSize: 16, fontFamily: 'AtlasDL3.1AAA-Bold', color: '#eb524b' }}>{counter}</Ticker>
        <Text variant="text" fontWeight="700" color="primaryColor" marginLeft="xs">
          מפגינים עכשיו
        </Text>
      </Animated.View>
      <Box flexDirection="row" justifyContent="center">
        {[...checkIns, ...checkIns].map((checkIn, index) => (
          <FastImage
            source={{ uri: checkIn.profilePicture }}
            style={[styles.profilePic, { marginLeft: index === 0 ? 0 : -12 }]}
            key={checkIn.id}
          />
        ))}
      </Box>
    </View>
  );
}

export default LocationCounter;

const styles = StyleSheet.create({
  profilePic: {
    width: 46,
    height: 46,
    marginBottom: 8,
    borderRadius: 50,
    borderWidth: 4,
  },
});
