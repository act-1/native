import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import functions from '@react-native-firebase/functions';
import firestore from '@react-native-firebase/firestore';
import App from './src/App';
import { name as appName } from './app.json';

// Use a local emulator in development
if (__DEV__) {
  functions().useFunctionsEmulator('http://localhost:5001');
  // auth().useEmulator('http://localhost:9099');
  // const db = firestore();
  // db.settings({ host: 'http://localhost:8080', ssl: false });
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
