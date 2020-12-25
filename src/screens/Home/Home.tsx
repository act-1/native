import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, PostBox } from '../../components';
import PostFeed from './PostFeed';

const posts = [1, 2, 3];

const HomeHeader = () => {
  return <Box style={styles.header} />;
};

function Home() {
  return (
    <ScrollView>
      <HomeHeader />
      <PostFeed posts={posts} />
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    height: 175,
    backgroundColor: '#304BFF',
  },
});
