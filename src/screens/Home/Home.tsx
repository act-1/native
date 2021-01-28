import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StatusBar, StyleSheet } from 'react-native';
import Stats from './widgets/Stats';

function Home() {
  return (
    <View style={styles.homeWrapper}>
      <StatusBar backgroundColor="#0a0a0a" barStyle="light-content" networkActivityIndicatorVisible={false} />
      <Stats />
    </View>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
});
