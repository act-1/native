import FeedService from '@services/feed';
import { PicturePost } from '@types/collections';
import { Alert } from 'react-native';

type PostActionInfo = {
  title: string;
  message: string;
  action: {
    text: string;
    onPress: () => void;
    style?: 'destructive';
  };
};

const actions = (post: PicturePost): { [key in PostAction]: PostActionInfo } => ({
  delete: {
    title: 'מחיקת תמונה',
    message: 'התמונה תמחק לצמיתות',
    action: {
      text: 'מחיקה',
      onPress: () => {
        FeedService.deletePost(post.id)
          .then(() => Alert.alert('התמונה נמחקה בהצלחה'))
          .catch((err) => {
            throw err;
          });
      },
      style: 'destructive',
    },
  },
  report: {
    title: 'דיווח על תוכן לא ראוי',
    message: 'הדיווח יישלח לבדיקה ע"י צוות Act1',
    action: {
      text: 'דיווח',
      onPress: () => {
        console.log(post);
        FeedService.reportPost(post)
          .then(() => Alert.alert('תודה!', 'הדיווח נשלח בהצלחה ויטפול בהקדם'))
          .catch((err) => {
            throw err;
          });
      },
      style: 'destructive',
    },
  },
});

export default actions;
