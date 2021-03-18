import React from 'react';
import { StyleSheet, PixelRatio } from 'react-native';
import { Box, Text } from '../../../components';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

let fontScale = PixelRatio.getFontScale();
if (fontScale > 1.2) fontScale = 1.2;

export default function RiotActions({ expand }) {
  const navigation = useNavigation();

  const camera = () => {
    launchCamera({ mediaType: 'photo' }, (image) => {
      if (image.didCancel) return null;
      navigation.navigate('NewPost', { image });
    });
  };

  return (
    <>
      <Box style={styles.actionsWrapper}>
        <RiotAction title="שליחת דיווח" iconName="alert-circle" />
        <RiotAction title="צילום תמונה" iconName="camera" onPress={() => expand()} />
        <RiotAction title="הזמנת חברים" iconName="share" />
      </Box>
    </>
  );
}

const RiotAction = ({ title, iconName, onPress }: { title: string; iconName: string; onPress?: () => void }) => (
  <TouchableOpacity style={{ alignItems: 'center', minWidth: 72.5 * fontScale }} onPress={onPress} activeOpacity={0.75}>
    <Icon name={iconName} size={34 * fontScale} color="white" style={{ marginBottom: 6 * fontScale }} />
    <Text variant="smallText" fontSize={12} maxFontSizeMultiplier={fontScale}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 12 * fontScale,
    marginTop: 12 * fontScale,
    backgroundColor: '#222222',
    borderRadius: 8,
  },
});
