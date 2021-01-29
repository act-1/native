import React from 'react';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import { Image, Button, ScrollView, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores';
import { Box, Text, PostBox } from '../../../components';
import { EventsWidget, LiveCheckIns } from './Feed/Widgets';
import { IPost } from '@types/post';

function PostFeed() {
  const [refreshing, setRefreshing] = React.useState(false);
  const store = useStore();
  const { posts } = store.feedStore;

  const onRefresh = async () => {
    setRefreshing(true);
    await store.feedStore.getPosts();
    analytics().logEvent('post_feed_refresh');
    setRefreshing(false);
  };

  return (
    <Box flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ece1e1" />}
        style={{ backgroundColor: '#0a0d0f' }}
      >
        {posts.length > 0 &&
          posts.map((post: IPost) => {
            return <PostBox {...post} key={post.id} />;
          })}
      </ScrollView>
    </Box>
  );
}

export default observer(PostFeed);
