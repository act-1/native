import React from 'react';
import { observer } from 'mobx-react-lite';
import { StatusBar } from 'react-native';
import PostFeed from './PostFeed';

function Home() {
  return (
    <>
      <StatusBar backgroundColor="#fafafa" barStyle="dark-content" networkActivityIndicatorVisible={false} />
      <PostFeed />
    </>
  );
}

export default observer(Home);
