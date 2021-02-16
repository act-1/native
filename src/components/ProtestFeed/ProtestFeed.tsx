import React, { useState, useEffect } from 'react';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { Alert, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Post } from '@types/collections';
import PostBox from '../PostBox';
import FeedService from '@services/feed';
import { ImageViewer } from '..';
import { removeArrayItem, updateArrayByObjectId } from '@utils/array-utils';

type ProtestFeedProps = {
  headerComponent: JSX.Element;
  locationId: string;
};

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

function ProtestFeed({ headerComponent, locationId }: ProtestFeedProps) {
  const [locationPosts, setLocationPosts] = useState<Post[]>([]);
  const [lastPostSnapshot, setLastPostSnapshot] = useState<FirebaseFirestoreTypes.QueryDocumentSnapshot | null>(null);
  const [fetchingPosts, setFetchingPosts] = useState(false);

  const [imageViewerVisiblity, setViewerVisibility] = useState(false);
  const [currentPictureUrl, setPictureUrl] = useState('');

  const query = React.useMemo(
    () =>
      firestore()
        .collection('posts')
        .where('locationId', '==', locationId)
        .where('archived', '==', false)
        .where('createdAt', '>', yesterday)
        .orderBy('createdAt', 'desc'),
    [locationId]
  );

  const selectPicture = (imageUrl: string) => {
    setPictureUrl(imageUrl);
    setViewerVisibility(true);
  };

  const updatePostLikeCount = (postId: string, likeCount: number) => {
    if (likeCount < 0) return;
    const updatedPosts = updateArrayByObjectId(locationPosts, postId, { likeCount });
    setLocationPosts(updatedPosts);
  };

  const archivePost = async (postId: string) => {
    try {
      Alert.alert('למחוק את הפוסט?', '', [
        {
          text: 'ביטול',
          style: 'cancel',
        },
        {
          text: 'אישור',
          style: 'destructive',
          onPress: async () => {
            const postDocument = locationPosts.find((post) => post.id === postId);
            const updatedPosts = removeArrayItem(locationPosts, postDocument);
            setLocationPosts(updatedPosts);

            await FeedService.archivePost(postId);
            console.log('archived');
          },
        },
      ]);
    } catch (err) {
      crashlytics().recordError(err);
      console.error(err);
    }
  };

  const loadMorePosts = () => {
    if (!fetchingPosts && locationPosts.length > 1) {
      setFetchingPosts(true);

      query
        .startAfter(lastPostSnapshot)
        .limit(10)
        .get()
        .then((snapshot) => {
          const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
          setLastPostSnapshot(lastSnapshot);

          const posts = snapshot.docs.map((doc) => doc.data()) as Post[];
          setLocationPosts((prevPosts) => [...prevPosts, ...posts]);

          setFetchingPosts(false);
        });
    }
  };

  useEffect(() => {
    setFetchingPosts(true);

    // Load initial posts
    query
      .limit(10)
      .get()
      .then((snapshot) => {
        const lastSnapshot = snapshot.docs[snapshot.docs.length - 1];
        setLastPostSnapshot(lastSnapshot);

        const posts = snapshot.docs.map((doc) => doc.data()) as Post[];
        setLocationPosts(posts);

        setFetchingPosts(false);
      });

    // Activate listener for new documents
    const realtimeListener = query.where('createdAt', '>', new Date());
    const unsubscribe = realtimeListener.onSnapshot(
      (snapshot) => {
        if (snapshot === null) return;
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const post = change.doc.data() as Post;
            setLocationPosts((prevState) => [post, ...prevState]);
          }
        });
      },
      (error) => {
        crashlytics().recordError(error);
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [locationId]);

  return (
    <>
      <ImageViewer
        isVisible={imageViewerVisiblity}
        setViewerVisiblity={(isVisible) => setViewerVisibility(isVisible)}
        imageUrl={currentPictureUrl}
      />
      <FlatList
        ListHeaderComponent={headerComponent}
        ListFooterComponent={() => <ActivityIndicator animating={fetchingPosts} />}
        ListFooterComponentStyle={{ marginVertical: 16 }}
        maintainVisibleContentPosition={{ minIndexForVisible: 6 }}
        data={locationPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostBox
            post={item}
            onPicturePress={selectPicture}
            updatePostLikeCount={updatePostLikeCount}
            archivePost={archivePost}
          />
        )}
        initialNumToRender={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePosts}
      />
    </>
  );
}

export default ProtestFeed;

const styles = StyleSheet.create({});
