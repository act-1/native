import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text } from '../../components';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Stats, FeaturedPictures, FeaturedEvents, FeaturedProtests } from '@components/Widgets';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        תמונות נבחרות
      </Text>

      <FeaturedPictures style={{ marginBottom: 12 }} />

      <Text variant="largeTitle" color="lightText" paddingHorizontal="m" marginTop="m" marginBottom="xm">
        עכשיו מפגינים
      </Text>

      <FeaturedProtests />

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
});
