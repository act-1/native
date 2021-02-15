import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { StyleSheet, FlatList } from 'react-native';
import { Post } from '@types/collections';
import PostBox from '../PostBox';
import { ImageViewer } from '..';
import { updateArrayByObjectId } from '@utils/array-utils';

type ProtestFeedProps = {
  headerComponent: JSX.Element;
  locationId: string;
};

function ProtestFeed({ headerComponent, locationId }: ProtestFeedProps) {
  const [locationPosts, setLocationPosts] = useState<Post[]>([]);
  const [imageViewerVisiblity, setViewerVisibility] = useState(false);
  const [currentPictureUrl, setPictureUrl] = useState('');

  const selectPicture = (imageUrl: string) => {
    setPictureUrl(imageUrl);
    setViewerVisibility(true);
  };

  const updatePostLikeCount = (postId: string, likeCount: number) => {
    const updatedPosts = updateArrayByObjectId(locationPosts, postId, { likeCount });
    setLocationPosts(updatedPosts);
  };

  useEffect(() => {
    const query = firestore()
      .collection('posts')
      .where('locationId', '==', locationId)
      .where('archived', '==', false)
      .orderBy('createdAt')
      .limit(10);

    // TODO: Sort by createdAt.

    const unsubscribe = query.onSnapshot(
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
        data={locationPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostBox post={item} onPicturePress={selectPicture} updatePostLikeCount={updatePostLikeCount} />
        )}
        initialNumToRender={2}
      />
    </>
  );
}

export default ProtestFeed;

const styles = StyleSheet.create({});
