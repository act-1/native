import firestore from '@react-native-firebase/firestore';

export async function getAllPosts() {
  try {
    const postsQuerySnapshot = await firestore().collection('posts').get();
    const postsDocuments = postsQuerySnapshot.docs.map((doc) => ({ ...doc.data(), timestamp: doc.data().timestamp.toDate() }));

    // Check if the user has liked each post
    const withUserLikes = postsDocuments.map(async (post) => {
      // TODO: Update with the current user id
      const liked = await checkUserPostLike(post.id, '8stsLzmYwWVaGf3Iw5IEhoViDuJ3');
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
