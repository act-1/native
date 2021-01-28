import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import Stats from './widgets/Stats';

function Home() {
  return (
    <ScrollView style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
    </ScrollView>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
});
