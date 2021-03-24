import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Image, StatusBar, StyleSheet, ScrollView, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { HomeScreenProps } from '@types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingModal from '@components/Modals/OnboardingModal';
import { View as MotiView } from 'moti';
import Icon from 'react-native-vector-icons/Feather';

import Planner from './Planner';
import Riot from './Riot';
import { RiotModeModal } from '@components/Modals';

const locationOffIcon = require('@assets/icons/location-off.png');
const riotOffIcon = require('@assets/icons/riot-mode-off.png');
const riotOnIcon = require('@assets/icons/riot-mode-on.png');

function Home({ navigation }: HomeScreenProps) {
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const [riotModalVisible, setRiotModalVisible] = useState(false);
  const { userStore, checkInStore } = useStore();
  const { currentCheckIn } = checkInStore;

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('onboardingFinished').then((value) => {
        if (!value) {
          setOnboardingVisible(true);
        }
      });
    }, 1500);
  }, []);

  useLayoutEffect(() => {
    let iconSource = locationOffIcon;
    let playIconAnimation = false;

    if (userStore.userLocationPermission === 'granted') iconSource = riotOffIcon;
    if (currentCheckIn) {
      iconSource = riotOnIcon;
      playIconAnimation = true;
    }

    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setRiotModalVisible(true)}
          style={{ alignItems: 'center', padding: 6, justifyContent: 'center', borderRadius: 50, marginRight: 8 }}
        >
          <MotiView from={{ opacity: 1 }} animate={{ opacity: 0.7 }} transition={{ loop: playIconAnimation, duration: 1250 }}>
            <Image source={iconSource} style={{ width: 26, resizeMode: 'contain' }} />
          </MotiView>
        </Pressable>
      ),
    });
  }, [navigation, userStore.userLocationPermission, currentCheckIn]);

  return (
    <>
      <ScrollView
        style={styles.homeWrapper}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
        {currentCheckIn ? <Riot regionName={currentCheckIn.locationRegion} /> : <Planner />}
        <OnboardingModal isModalVisible={onboardingVisible} setModalVisible={setOnboardingVisible} />
        <RiotModeModal isModalVisible={riotModalVisible} setModalVisible={setRiotModalVisible} />
      </ScrollView>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: { flex: 1 },
  scrollViewContainer: { paddingBottom: 24 },

  mapCounter: {
    padding: 8,
    borderRadius: 8,
  },
});

{
  // const liveEvents = React.useMemo(() => {
  //   return eventStore.liveEvents
  //     .map((event: Event) => {
  //       const protesters = liveStore.locationsCount[event.locationId];
  //       if (protesters) {
  //         return { ...event, protesters };
  //       } else {
  //         return { ...event, protesters: 0 };
  //       }
  //     })
  //     .sort((a, b) => b.protesters - a.protesters);
  // }, [eventStore.liveEvents, liveStore.locationsCount]);
}
// {liveEvents.length > 0 && (
//   <>
//     <Text variant="largeTitle" paddingHorizontal="m" marginTop="m" marginBottom="xm">
//       עכשיו מפגינים
//     </Text>

//     <FeaturedProtests protests={liveEvents} style={{ marginBottom: 12 }} />
//   </>
// )}
