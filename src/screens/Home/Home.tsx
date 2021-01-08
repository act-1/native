import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, StatusBar, StyleSheet } from 'react-native';
import PostFeed from './PostFeed';

function Home() {
  return (
    <View style={styles.homeWrapper}>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" networkActivityIndicatorVisible={false} />
      <PostFeed />
    </View>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
});
