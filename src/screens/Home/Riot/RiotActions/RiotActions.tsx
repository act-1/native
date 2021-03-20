import React from 'react';
import { Share, StyleSheet, PixelRatio } from 'react-native';
import { Box, Text } from '../../../../components';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ContextMenuButton } from 'react-native-ios-context-menu';
import HapticFeedback from 'react-native-haptic-feedback';

let fontScale = PixelRatio.getFontScale();
if (fontScale > 1.2) fontScale = 1.2;

export default function RiotActions({ expand }) {
  const navigation = useNavigation();

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, (image) => {
      if (image.didCancel) return null;
      navigation.navigate('NewPost', { image });
    });
  };

  const openImageGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, (image) => {
      if (image.didCancel) return null;
      navigation.navigate('NewPost', { image });
    });
  };

  const handleImageMenuPress = (actionKey) => {
    if (actionKey === 'camera') {
      openCamera();
    } else {
      openImageGallery();
    }
  };

  return (
    <>
      <Box style={styles.actionsWrapper}>
        {/* <ContextMenuButton
          isMenuPrimaryAction={true}
          onPress={() => HapticFeedback.trigger('impactLight')}
          onPressMenuItem={({ nativeEvent }) => console.log(nativeEvent)}
          menuConfig={{
            menuTitle: '',
            menuItems: [
              {
                menuTitle: 'אלימות',
                icon: {
                  iconType: 'SYSTEM',
                  iconValue: 'person.crop.circle.badge.exclamationmark',
                  iconTint: 'red',
                },
                menuItems: [
                  {
                    actionKey: 'key-01-01',
                    actionTitle: 'משטרה',
                    icon: {
                      iconType: 'SYSTEM',
                      iconValue: 'dial',
                    },
                  },
                  {
                    actionKey: 'key-01-02',
                    actionTitle: 'פשיסטים',
                    icon: {
                      iconType: 'SYSTEM',
                      iconValue: 'dial',
                    },
                  },
                ],
              },
              {
                actionKey: 'key-02',
                actionTitle: 'מעצר',
                icon: {
                  iconType: 'SYSTEM',
                  iconValue: 'link',
                  iconTint: '#a3a3a3',
                },
              },
              {
                actionKey: 'key-03',
                actionTitle: 'כללי',
                icon: {
                  iconType: 'SYSTEM',
                  iconValue: 'exclamationmark.triangle.fill',
                  iconTint: 'rgb(218,165,32)',
                },
              },
            ],
          }}
        >
          <RiotAction title="שליחת דיווח" iconName="alert-circle" />
        </ContextMenuButton> */}
        <ContextMenuButton
          isMenuPrimaryAction={true}
          onPressMenuItem={({ nativeEvent }) => handleImageMenuPress(nativeEvent.actionKey)}
          menuConfig={{
            menuTitle: '',
            menuItems: [
              {
                actionKey: 'camera',
                actionTitle: 'תמונה חדשה',
                icon: {
                  iconType: 'SYSTEM',
                  iconValue: 'camera',
                },
              },
              {
                actionKey: 'gallery',
                actionTitle: 'גלריית תמונות',
                icon: {
                  iconType: 'SYSTEM',
                  iconValue: 'photo.on.rectangle.angled',
                },
              },
            ],
          }}
        >
          <RiotAction title="צילום תמונה" iconName="camera" />
        </ContextMenuButton>
        <RiotAction
          title="הזמנת חברים"
          iconName="share"
          onPress={() => {
            Share.share({ url: 'https://act1.co.il', message: 'הצטרפו אליי להפגנה ב- ACT1' });
          }}
        />
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
