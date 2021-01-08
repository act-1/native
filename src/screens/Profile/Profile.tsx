import React from 'react';
import { Button, Text } from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';
import { Box } from '../../components';
import { RoundedButton } from '../../components/Buttons';

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

// Create response callback.
function _responseInfoCallback(error: any, result: any) {
  if (error) {
    console.log('Error fetching data: ', error);
  } else {
    console.log('Success fetching data: ', result);
  }
}

async function onFacebookButtonPress() {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log(result);
    // if (result.isCancelled) {
    //   throw 'User cancelled the login process';
    // }

    // // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }

    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // console.log(facebookCredential);

    // const userCredential = await auth().currentUser?.linkWithCredential(facebookCredential);
    // const user = await auth().currentUser;
    // console.log(user);
    // const facebookid = user?.providerData[0].uid;
    // console.log(user?.providerData[0].uid);

    // // const facebookUserId = userCredential?.additionalUserInfo?.profile?.id;
    // const tokenObj = await AccessToken.getCurrentAccessToken();
    // // Create a graph request asking for user information with a callback to handle the response.
    // const infoRequest = new GraphRequest(
    //   `/me`,
    //   {
    //     accessToken: tokenObj.accessToken,
    //     parameters: {
    //       fields: {
    //         string: 'first_name,gender,picture.type(large)',
    //       },
    //     },
    //   },
    //   _responseInfoCallback
    // );
    // // Start the graph request.
    // new GraphRequestManager().addRequest(infoRequest).start();
  } catch (err) {
    console.log(err);
  }
}

function Profile({ navigation }: ProfileScreenProps) {
  return (
    <Box paddingTop="xl" justifyContent="center" alignItems="center">
      <RoundedButton text="התחברות דרך פייסבוק" color="black" onPress={onFacebookButtonPress} />
    </Box>
  );
  // return <Button title="open me" onPress={() => navigation.navigate('SignUpNavigator', { screen: 'SignUpScreen' })} />;
}

export default Profile;
