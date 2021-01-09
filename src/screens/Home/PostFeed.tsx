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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ece1e1" />}
        style={{ backgroundColor: '#040506' }}
      >
        {posts.length > 0 &&
          posts.map((post: IPost, index: number) => {
            if (index === 5) {
              return (
                <Box key={post.id}>
                  <EventsWidget style={{ marginVertical: 8 }} />
                  <PostBox {...post} />
                </Box>
              );
            }
            return <PostBox {...post} key={post.id} />;
          })}
      </ScrollView>
    </Box>
  );
}

export default observer(PostFeed);
