import React, { useState, useEffect } from 'react';
import { useStore } from '../../stores';
import { LogBox, View, Button, FlatList, Platform, UIManager } from 'react-native';
import LiveFeedEntry from './LiveFeedEntry';
import database from '@react-native-firebase/database';

// LogBox.ignoreLogs(['Encountered']);

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// To avoid onEndReached initial render call
let startedScroll = false;

export default function LiveFeed() {
  const { userStore } = useStore();
  const [checkIns, setCheckIns] = useState<RTDBCheckIn[]>([]);
  const [isFetching, setFetching] = useState(false);
  // const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const query = database().ref('checkIns').orderByChild('createdAt').limitToLast(30);

    query.on('child_added', (snapshot) => {
      setCheckIns((prevState) => {
        return [{ ...snapshot.val() }, ...prevState];
      });
    });

    // query.once('value', () => {
    //   setLoading(false);
    // });

    return () => {
      query.off();
    };
  }, []);

  // Fetch older items
  const fetchOlderItems = () => {
    if (isFetching) setTimeout(() => fetchOlderItems(), 250);
    if (startedScroll) {
      console.log('start...');
      setFetching(true);

      const lastCheckInTimestamp = (checkIns[checkIns.length - 1].createdAt - 1) as number;
      const query = database().ref('checkIns').orderByChild('createdAt').endAt(lastCheckInTimestamp).limitToLast(30);

      query.once('value', (snapshot) => {
        const snapshotValue = snapshot.val();

        if (snapshotValue) {
          const newCheckIns = Object.values(snapshotValue) as RTDBCheckIn[];
          const sortedCheckIns = newCheckIns.sort((a, b) => a.createdAt - b.createdAt).reverse();
          sortedCheckIns.forEach((c) => console.log(c.displayName));

          console.log('end');
          setCheckIns((prevState) => [...prevState, ...sortedCheckIns]);
          setFetching(false);
        } else {
          // Fetched all pictures
          // setFetching(true);
        }
      });
    }
  };

  // // If reached page bottom, fetch more pictures
  // useEffect(() => {
  //   if (visible && !fetching) {
  //     setFetchingState(true);
  //     const lastPictureTimestamp = pictures[pictures.length - 1].createdAt - 1;
  //     const picturesQuery = realtimeDB.ref(`live_feed`).orderByChild('createdAt').endAt(lastPictureTimestamp).limitToLast(10);

  //     picturesQuery.once('value', (snapshot) => {
  //       const snapshotValue = snapshot.val();
  //       if (snapshotValue) {
  //         const newPictures = Object.values(snapshotValue)
  //           .reverse()
  //           .map((picture) => ({ ...picture, id: nanoid() }));

  //         setPictures((prevState) => [...prevState, ...newPictures]);
  //         setFetchingState(false);
  //       } else {
  //         // Fetched all pictures
  //         setFetchedAll(true);
  //       }
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visible]);

  const renderItem = ({ item }) => (
    <LiveFeedEntry profilePicture={item.profilePicture} displayName={item.displayName} locationName={item.locationName} />
  );
  return (
    <>
      <FlatList
        data={checkIns}
        renderItem={renderItem}
        onMomentumScrollBegin={() => (startedScroll = true)}
        onEndReachedThreshold={0.5}
        onEndReached={fetchOlderItems}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginBottom: 50 }}>
        <Button
          title="צ׳ק אין"
          onPress={() => {
            userStore.checkIn({
              isActive: true,
              locationCity: 'תל אביב - יפו',
              locationId: 'habima',
              locationName: 'כיכר שדגשדגש',
              userId: 'd8GSM5GdfuW0KDlH7dy8oqd5ngz1',
            });
          }}
        />
        <Button title="MORE" onPress={() => fetchOlderItems()} />
      </View>
    </>
  );
}
