import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { StyleSheet, FlatList } from 'react-native';
import { Post } from '@types/collections';
import PostBox from '../PostBox';

type ProtestFeedProps = {
  headerComponent: JSX.Element;
  locationId: string;
};

function ProtestFeed({ headerComponent, locationId }: ProtestFeedProps) {
  const [locationPosts, setLocationPosts] = useState<Post[]>([]);

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
    <FlatList
      ListHeaderComponent={headerComponent}
      data={locationPosts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostBox post={item} />}
      initialNumToRender={2}
    />
  );
}

export default ProtestFeed;

const styles = StyleSheet.create({});
