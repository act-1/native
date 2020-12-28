import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import analytics from '@react-native-firebase/analytics';

export async function getAllPosts(userId: string) {
  try {
    const postsQuerySnapshot = await firestore().collection('posts').orderBy('timestamp', 'desc').get();
    const postsDocuments = postsQuerySnapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
      id: doc.id,
    }));

    // Check if the user has liked each post
    const withUserLikes = postsDocuments.map(async (post) => {
      // TODO: Update with the current user id
      const liked = await checkUserPostLike(post.id, userId);
      return { ...post, liked };
    });

    const posts = await Promise.all(withUserLikes);
    console.log(posts);

    return posts;
  } catch (err) {
    throw err;
  }
}

/**
 * Check if the user has liked a specific post.
 * @param postId The post Id to check the user's like ststus.
 * @param userId The user Id to check the like status for.
 * @returns {Promise} Resolved with the like status (true/false)
 */
async function checkUserPostLike(postId: string, userId: string): Promise<boolean> {
  try {
    const like = await firestore().collection(`posts/${postId}/likes`).doc(userId).get();

    if (like.exists) {
      return true;
    }

    return false;
  } catch (err) {
    throw err;
  }
}

export async function likePost(postId: string): Promise<{ liked: boolean }> {
  try {
    const result = await functions().httpsCallable('likePost')({ postId });
    if (result.data.ok) {
      await analytics().logEvent('post_like', { post_id: postId });
      return { liked: true };
    }
    throw new Error('Unkown error occured while requesting like.');
  } catch (err) {
    throw err;
  }
}

export async function unlikePost(postId: string): Promise<{ unliked: boolean }> {
  try {
    const result = await functions().httpsCallable('unlikePost')({ postId });
    if (result.data.ok) {
      await analytics().logEvent('post_unlike', { post_id: postId });
      return { unliked: true };
    }
    throw new Error('Unkown error occured while requesting unlike.');
  } catch (err) {
    throw err;
  }
}
