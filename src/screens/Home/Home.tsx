import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text } from '../../components';
import { StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Stats, FeaturedEvents, FeaturedPictures } from '@components/Widgets';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
      <Box paddingHorizontal="m" marginTop="m" marginBottom="xm">
        <Text variant="largeTitle" color="lightText">
          תמונות נבחרות
        </Text>
      </Box>
      <FeaturedPictures style={{ marginBottom: 12 }} />

      <Box paddingHorizontal="m" marginTop="m" marginBottom="xm">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
      </Box>
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
