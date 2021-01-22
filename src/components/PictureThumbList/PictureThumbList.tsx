import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PictureThumbList({ pictures }: { pictures: Picture[] }) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {pictures.map((picture, index) => (
        <TouchableOpacity onPress={() => navigation.navigate('ExploreList', { initialIndex: index })} key={picture.id}>
          <FastImage style={styles.imageThumb} source={{ uri: picture.pictureUrl }} />
        </TouchableOpacity>
      ))}
    </Box>
  );
}

export default PictureThumbList;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageThumb: {
    height: deviceWidth / 3,
    width: deviceWidth / 3,
    borderWidth: 1,
  },
});
