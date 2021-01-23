import React from 'react';
import { ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Box, Text } from '../../components';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { NewPostProps } from '../../types/navigation';
import { uploadImage } from '@services/storage';

const deviceWidth = Dimensions.get('window').width;

const profilePicture =
  'https://scontent.ftlv15-1.fna.fbcdn.net/v/t1.0-9/120795507_338405427579471_6909790557627558055_o.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=PQG6dprSZCIAX8VJfTJ&_nc_ht=scontent.ftlv15-1.fna&oh=fc18d3204ba2333145b39aad27c838ae&oe=6032F1FF';

function NewPost({ navigation, route }: NewPostProps) {
  const { image } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => uploadImage(image)}>
          <Box backgroundColor="primaryColor" paddingHorizontal="m" paddingVertical="xs" marginBottom="s" borderRadius={4}>
            <Text variant="text" fontSize={18} color="primaryText" fontWeight="600">
              פרסום
            </Text>
          </Box>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={{ paddingTop: 12 }}>
      <Box paddingHorizontal="m">
        <Box flexDirection="row" alignItems="center" marginBottom="m">
          <FastImage source={{ uri: profilePicture }} style={styles.profilePicture} />
          <TextInput placeholder="מסר לאומה..." placeholderTextColor="grey" style={styles.textInput} multiline={true} />
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
