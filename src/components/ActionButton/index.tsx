import React from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import HapticFeedback from 'react-native-haptic-feedback';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const fistIcon = require('@assets/icons/fist-icon.png');

function ActionButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { checkInStore } = useStore();
  return (
    <TouchableScale
      activeScale={0.94}
      friction={7}
      onPressIn={() => {
        // Vibrate some android devices in an annoying way.
        // Better leave it exclusively to iOS for now.
        if (Platform.OS === 'ios') {
          HapticFeedback.trigger('impactLight');
        }
      }}
      onPressOut={() => {
        if (Platform.OS === 'ios') {
          HapticFeedback.trigger('impactMedium');
        }
      }}
      onPress={() => {
        if (checkInStore.hasActiveCheckIn) {
          navigation.navigate('ProtestDashboard');
        } else {
          navigation.navigate('Secondary', { screen: 'CheckInModal' });
        }
      }}
      style={[styles.checkInIconWrapper, { bottom: insets.bottom > 0 ? 30 : 35 }]}
    >
      <Image source={fistIcon} style={styles.checkInIcon} />
    </TouchableScale>
  );
}

export default observer(ActionButton);

const { width: deviceWidth } = Dimensions.get('screen');

let actionTabButtonSize = Platform.select({ ios: 67, android: 70 });
let actionIconWidth = Platform.select({ ios: 38, android: 39 });
let actionIconHeight = Platform.select({ ios: 35, android: 37 });

if (deviceWidth > 400) {
  actionTabButtonSize = 75;
  actionIconWidth = 40;
  actionIconHeight = 37.5;
}

const styles = StyleSheet.create({
  checkInIconWrapper: {
    height: actionTabButtonSize,
    width: actionTabButtonSize,

    borderRadius: 58,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
    borderWidth: 4,
    borderColor: '#32373d',
    backgroundColor: '#071516',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    elevation: 2,

    opacity: 0.95,
  },
  checkInIcon: {
    width: actionIconWidth,
    height: actionIconHeight,
    tintColor: '#ec534b',
  },
});
