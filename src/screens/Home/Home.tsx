import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Text } from '../../components';
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import Stats from './Widgets/Stats';
import FeaturedEvents from './Widgets/FeaturedEvents';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
      <Box paddingHorizontal="m" marginTop="m">
        <Text variant="largeTitle" color="lightText">
          הפגנות קרובות
        </Text>
      </Box>
      <FeaturedEvents />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
});
