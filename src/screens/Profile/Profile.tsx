import React from 'react';
import { FlatList, Button, Image, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text, EditProfilePicture } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProfileScreenProps } from '../../types/navigation';
import { BlurView } from '@react-native-community/blur';

const CustomView = (props) =>
  Platform.select({ ios: <BlurView {...props} />, android: <Box {...props} backgroundColor="greyBackground" /> });

function Profile({ navigation }: ProfileScreenProps) {
  const { userStore } = useStore();

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: () => null,
  //   });
  // }, [navigation]);

  return (
    <>
      <Box paddingTop="m" justifyContent="center" alignItems="center">
        <EditProfilePicture displayEditLink={false} />

        <Box
          flexDirection="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
          paddingVertical="xm"
          backgroundColor="greyBackground"
          marginBottom="m"
        >
          <Box alignItems="center" marginEnd="xxl" opacity={0.6}>
            <Image source={require('@assets/icons/strike.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
            <Text variant="boxTitle" color="subText" fontSize={14}>
              8 הפגנות
            </Text>
          </Box>
          <Box alignItems="center" opacity={0.6}>
            <Image source={require('@assets/icons/camera.png')} style={{ width: 38, height: 38, tintColor: '#737373' }} />
            <Text variant="boxTitle" color="subText" fontSize={14}>
              12 תמונות
            </Text>
          </Box>
        </Box>

        {/* <Button
        title="התנתקות"
        onPress={() => {
          userStore.signOut();
        }}
      /> */}
      </Box>
    </>
  );
}

export default observer(Profile);

const styles = StyleSheet.create({});
