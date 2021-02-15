import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { Box } from '../../components';
import { HeaderButton } from '@components/Buttons';
import { createTextPost } from '@services/feed';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { NewPostProps } from '../../types/navigation';

const deviceWidth = Dimensions.get('window').width;

function NewPost({ navigation, route }: NewPostProps) {
  const { userStore, feedStore, mediaStore } = useStore();
  const [caption, setCaption] = useState('');
  const { image, completionScreen, location } = route.params;

  const uploadPost = async (textContent: string) => {
    try {
      if (image) {
        feedStore.uploadImage({ image, text: caption, location });
      } else {
        const locationData = {
          locationId: location!.id,
          locationName: location!.name,
          locationCity: location!.city,
          locationProvince: location!.province,
          coordinates: location!.coordinates,
        };

        await createTextPost({ textContent, locationData });
      }

      navigation.goBack();
    } catch (err) {
      console.error(err);
      crashlytics().setAttribute('image_object', JSON.stringify(image));
      crashlytics().recordError(err);
      Alert.alert('ארעה שגיאה');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          text="פרסום"
          onPress={() => uploadPost(caption)}
          color="primaryRed"
          disabled={!image && caption.length < 4}
        />
      ),
    });
  }, [navigation, caption]);

  return (
    <ScrollView style={{ paddingTop: 12 }}>
      <Box paddingHorizontal="m">
        <Box flexDirection="row" alignItems="flex-start" marginBottom="m">
          <FastImage source={{ uri: userStore.userData?.profilePicture }} style={styles.profilePicture} />
          <TextInput
            value={caption}
            onChangeText={(text) => setCaption(text)}
            placeholder="מסר לאומה..."
            placeholderTextColor="grey"
            style={styles.textInput}
            multiline={true}
            autoFocus={!image}
            keyboardType="twitter"
          />
        </Box>

        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('SelectLocation')}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingVertical="s"
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="seperator"
            marginBottom="m"
            opacity={0.8}
          >
            <Text variant="text">הוספת מיקום</Text>
            <Text variant="text" marginRight="s">
              {'<'}
            </Text>
          </Box>
        </TouchableOpacity> */}

        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ height: image.height! / (image.width! / (deviceWidth - 24)), width: '100%', borderRadius: 6 }}
          />
        )}
      </Box>
    </ScrollView>
  );
}

export default observer(NewPost);

const styles = StyleSheet.create({
  profilePicture: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 1,
    paddingRight: 52,
    fontSize: 20,
    textAlign: 'right',
    color: 'white',
  },
});
