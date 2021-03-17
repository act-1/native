import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../../../components';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function RiotActions() {
  const navigation = useNavigation();

  const camera = () => {
    launchCamera({ mediaType: 'photo' }, (image) => {
      if (image.didCancel) return null;
      navigation.navigate('NewPost', { image });
    });
  };

  return (
    <Box style={styles.actionsWrapper}>
      <RiotAction title="שליחת דיווח" iconName="alert-circle" />
      <RiotAction title="צילום תמונה" iconName="camera" onPress={() => camera()} />
      <RiotAction title="הזמנת חברים" iconName="share" />
    </Box>
  );
}

const RiotAction = ({ title, iconName, onPress }: { title: string; iconName: string; onPress?: () => void }) => (
  <TouchableOpacity style={{ alignItems: 'center', minWidth: 72.5 }} onPress={onPress} activeOpacity={0.75}>
    <Icon name={iconName} size={34} color="white" style={{ marginBottom: 6 }} />
    <Text variant="smallText" fontSize={12}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
    backgroundColor: '#222222',
    borderRadius: 8,
  },
});
