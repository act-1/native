import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Box, PostBox } from '../../components';

const HomeHeader = () => {
  return <Box style={styles.oval} />;
};

function Home() {
  return (
    <Box flex={1} width="100%" backgroundColor="dimmedBackground">
      <HomeHeader />
      <PostBox />
    </Box>
  );
}

export default Home;

const styles = StyleSheet.create({
  oval: {
    marginTop: -50,
    width: '100%',
    height: 175,
    backgroundColor: '#304BFF',
  },
});
