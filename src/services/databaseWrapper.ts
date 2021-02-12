import { firebase, FirebaseDatabaseTypes } from '@react-native-firebase/database';

class DatabaseWrapper {
  database: FirebaseDatabaseTypes.Module;

  constructor() {
    if (__DEV__) {
      // Setup correct address and port of the firebase emulator: https://rnfirebase.io/database/usage#using-emulator
      this.database = firebase.app().database('http://localhost:9000/?ns=act1-dev-default-rtdb');
    } else {
      // this.database = firebase.app().database('http://yourProductionUrl?ns=YOUR_PRODUCTION_DATABASE_NAME');
    }
  }
}
export const RealtimeDatabase = new DatabaseWrapper();
