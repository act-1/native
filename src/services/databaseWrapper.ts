import { firebase, FirebaseDatabaseTypes } from '@react-native-firebase/database';

class DatabaseWrapper {
  database: FirebaseDatabaseTypes.Module;

  constructor() {
    if (__DEV__) {
      // this.database = firebase.app().database('http://localhost:9000/?ns=act1-dev-default-rtdb');
      this.database = firebase.app().database('https://act1-dev-default-rtdb.firebaseio.com/');
    } else {
      this.database = firebase.app().database('https://act1-dev-default-rtdb.firebaseio.com/');
    }
  }
}
export const RealtimeDatabase = new DatabaseWrapper();
