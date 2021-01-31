import React, { useState, useEffect } from 'react';
import { useStore } from '../../stores';
import { Button, FlatList, RefreshControl, View } from 'react-native';
import LiveFeedEntry from './LiveFeedEntry';
import database from '@react-native-firebase/database';

// To avoid onEndReached initial render call
let startedScroll = false;

// TODO: Measure refresh with perf and analytics
export default function LiveFeed() {
  const { userStore } = useStore();
  const [checkIns, setCheckIns] = useState<RTDBCheckIn[]>([]);
  const [isFetchingNew, setFetchingNew] = useState(false);
  const [isFetchingOld, setFetchingOld] = useState(false);

  useEffect(() => {
    const query = database().ref('checkIns').orderByChild('createdAt').limitToLast(30);

    query.once('value', (snapshot) => {
      const snapshotValue = snapshot.val();
      if (snapshotValue) {
        setCheckIns((prevState) => {
          const newCheckIns = Object.values(snapshotValue) as RTDBCheckIn[];
          const sortedCheckIns = newCheckIns.sort((a, b) => a.createdAt - b.createdAt).reverse();
          console.log(sortedCheckIns);

          return [...sortedCheckIns, ...prevState];
        });
      }
    });

    return () => {
      query.off();
    };
  }, []);

  const fetchNewItems = () => {
    setFetchingNew(true);

    const firstCheckIn = (checkIns[0].createdAt + 1) as number;
    const query = database().ref('checkIns').orderByChild('createdAt').startAt(firstCheckIn).limitToLast(30);

    query.once('value', (snapshot) => {
      const snapshotValue = snapshot.val();

      if (snapshotValue) {
        const newCheckIns = Object.values(snapshotValue) as RTDBCheckIn[];
        const sortedCheckIns = newCheckIns.sort((a, b) => a.createdAt - b.createdAt);

        setCheckIns((prevState) => [...sortedCheckIns, ...prevState]);
        setFetchingNew(false);
      } else {
        // Fetched all pictures
        // It returns fast usually so we provide a bit delay.
        setTimeout(() => {
          setFetchingNew(false);
        }, 450);
      }
    });
  };

  const fetchOlderItems = () => {
    if (isFetchingOld) setTimeout(() => fetchOlderItems(), 250);
    if (startedScroll) {
      setFetchingOld(true);
      console.log('fetching..');
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
          setFetchingOld(false);
        } else {
          // Fetched all pictures
          setFetchingOld(false);
        }
      });
    }
  };

  const renderItem = ({ item }) => (
    <LiveFeedEntry profilePicture={item.profilePicture} displayName={item.displayName} locationName={item.locationName} />
  );
  return (
    <>
      <FlatList
        data={checkIns}
        renderItem={renderItem}
        onMomentumScrollBegin={() => (startedScroll = true)}
        onEndReachedThreshold={0.3}
        refreshControl={<RefreshControl refreshing={isFetchingNew} onRefresh={fetchNewItems} tintColor="white" />}
        onEndReached={fetchOlderItems}
        keyExtractor={(item) => item.id}
        maintainVisibleContentPosition={0}
      />
      <View style={{ marginBottom: 30 }}>
        <Button
          title="add me!"
          onPress={() =>
            setCheckIns((prevState) => [
              {
                createdAt: 1612024143840,
                displayName: 122223,
                id: '232323222-111CvSN',
                isActive: true,
                locationCity: 'תל אביב - יפו',
                locationId: 'habima',
                locationName: 'כיכר הבימה',
                profilePicture: 'https://randomuser.me/api/portraits/men/100.jpg',
                userId: 'd8GSM5GdfuW0KDlH7dy8oqd5ngz1',
              },
              ...prevState,
            ])
          }
        />
      </View>
    </>
  );
}
