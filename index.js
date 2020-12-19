import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import functions from '@react-native-firebase/functions';
import App from './src/App';
import { name as appName } from './app.json';

// Use a local emulator in development
// if (__DEV__) {
// console.log(__DEV__);
// functions().useFunctionsEmulator('http://localhost:5001/codename-merry/us-central1/attendEvent');
// }

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
