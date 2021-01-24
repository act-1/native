import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useStore } from '../../stores';
import { Box, Text } from '../../components';
import { HeaderButton } from '@components/Buttons';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { NewPostProps } from '../../types/navigation';
import FeedService from '@services/feed';
const deviceWidth = Dimensions.get('window').width;

function NewPost({ navigation, route }: NewPostProps) {
  const { userStore } = useStore();
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState('');
  const { image } = route.params;

  const uploadPost = async () => {
    try {
      setUploading(true);
      await FeedService.newImagePost({ image, text: content });
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
      crashlytics().setAttribute('image_object', JSON.stringify(image));
      crashlytics().recordError(err);
      Alert.alert('ארעה שגיאה');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton text="פרסום" onPress={uploadPost} color="primaryRed" loading={uploading} />,
    });
  }, [navigation, uploading]);

  return (
    <ScrollView style={{ paddingTop: 12 }}>
      <Box paddingHorizontal="m">
        <Box flexDirection="row" alignItems="center" marginBottom="m">
          <FastImage source={{ uri: userStore.userData?.profilePicture }} style={styles.profilePicture} />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="מסר לאומה..."
            placeholderTextColor="grey"
            style={styles.textInput}
            multiline={true}
          />
        </Box>
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
        <Image
          source={{ uri: image.uri }}
          style={{ height: image.height! / (image.width! / (deviceWidth - 24)), width: '100%', borderRadius: 6 }}
        />
      </Box>
    </ScrollView>
  );
}

export default NewPost;

const styles = StyleSheet.create({
  profilePicture: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 8,
  },
  textInput: {
    fontSize: 20,
    textAlign: 'right',
    color: 'white',
  },
});
