import React from 'react';
import { observer } from 'mobx-react-lite';
import { StatusBar, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components';
import { useStore } from '../../stores';
import PostFeed from './PostFeed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreenProps } from '@types/navigation';

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.header, { height: 46 + insets.top }]}>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" networkActivityIndicatorVisible={false} />
      <Text variant="hugeTitle" fontFamily="Rubik-Medium" fontWeight="500" fontSize={18} style={{ color: '#6E7DFF' }}>
        Act1
      </Text>
    </SafeAreaView>
  );
};

function Home({ navigation }: HomeScreenProps) {
  return (
    <>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f2f2f2' }}>
        <PostFeed />
      </ScrollView>
    </>
  );
}

export default observer(Home);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    elevation: 5,
    zIndex: 2,
  },
});
