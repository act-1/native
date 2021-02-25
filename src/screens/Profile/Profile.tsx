import React from 'react';
import { FlatList, Button, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { ProfileScreenProps } from '../../types/navigation';
import { BlurView, VibrancyView } from '@react-native-community/blur';

function Profile({ navigation }: ProfileScreenProps) {
  const { userStore } = useStore();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  return (
    <>
      <Box zIndex={12} paddingTop="xxl" style={StyleSheet.absoluteFill}>
        <Text variant="extraLargeTitle" textAlign="center">
          פרופיל אישי - בקרוב
        </Text>
      </Box>
      <BlurView style={{ ...StyleSheet.absoluteFillObject, zIndex: 10 }} />
      <Box paddingTop="m" justifyContent="center" alignItems="center">
        <FastImage source={{ uri: userStore.userData?.profilePicture }} style={styles.profilePicture} />

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

const styles = StyleSheet.create({
  profilePicture: {
    width: 90,
    height: 90,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: '#393939',
    borderRadius: 50,
  },
});
