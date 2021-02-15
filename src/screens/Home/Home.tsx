import React from 'react';
import { observer } from 'mobx-react-lite';
import functions from '@react-native-firebase/functions';
import { Box, Text } from '../../components';
import { StatusBar, StyleSheet, ScrollView, Button } from 'react-native';
import { Stats, FeaturedPictures, FeaturedEvents, FeaturedProtests } from '@components/Widgets';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
      <Button title="check in update" onPress={() => functions().httpsCallable('updateCheckInCountManually')()} />
      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות נבחרות
      </Text>

      <FeaturedPictures style={{ marginBottom: 12 }} />

      {/* <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        עכשיו מפגינים
      </Text>

      <FeaturedProtests /> */}

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        הפגנות קרובות
      </Text>

      <FeaturedEvents style={{ marginBottom: 42 }} />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
  upcomingProtestsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#191919',
  },
});
