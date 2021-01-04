import React from 'react';
import analytics from '@react-native-firebase/analytics';
import { ScrollView, RefreshControl } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { Box, PostBox } from '../../components';
import { EventsWidget, LiveCheckIns } from './Feed/Widgets';
import { IPost } from '@types/post';

function PostFeed() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { feedStore } = useStore();
  const { posts } = feedStore;
  const { eventStore } = useStore();

  const onRefresh = async () => {
    setRefreshing(true);
    await feedStore.getPosts();
    analytics().logEvent('post_feed_refresh');
    setRefreshing(false);
  };

  return (
    <Box flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ backgroundColor: '#f2f2f2' }}
      >
        {posts.length > 0 && posts.map((post: IPost) => <PostBox {...post} key={post.id} />)}
        <EventsWidget style={{ marginVertical: 8 }} />
      </ScrollView>
    </Box>
  );
}

export default observer(PostFeed);
