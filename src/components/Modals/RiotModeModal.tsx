import React from 'react';
import { StyleSheet, Image, Dimensions, Platform, AppState } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { requestLocationPermission } from '@utils/location-utils';
import { openSettings } from 'react-native-permissions';
import Modal from 'react-native-modal';
import { Box, Text, RoundedButton } from '../';

const locationOffIcon = require('@assets/icons/location-off.png');
const { width: deviceWidth } = Dimensions.get('screen');

function RiotModeModal({ isModalVisible, setModalVisible }: ModalProps) {
  const { userStore, checkInStore } = useStore();
  const { currentCheckIn } = checkInStore;
  const { userLocationPermission, userCurrentPosition } = userStore;

  // Listen to location permission setting change if the user changed permission through the device settings.
  React.useEffect(() => {
    function handleAppStateChange(appState: AppStateStatus) {
      if (appState === 'active') {
        userStore.updateLocationPermission();
      }
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestLocation = async () => {
    await requestLocationPermission();
    userStore.initUserLocation();
  };

  let modalContent = null;

  if (userStore.userLocationPermission !== 'granted') {
    if (userLocationPermission === 'blocked') {
      modalContent = (
        <>
          <Image source={locationOffIcon} style={{ width: 75, height: 75, marginBottom: 16, tintColor: '#f67272' }} />
          <Text variant="largeTitle" style={{ color: '#f67272' }} textAlign="center" marginBottom="xm">
            שירותי המיקום מנוטרלים
          </Text>
          <Text variant="text" fontWeight="500" textAlign="center" marginBottom="s">
            יש לאפשר שימוש בשירותי המיקום על מנת להכנס למצב הפגנה
          </Text>
          <Text variant="text" textAlign="center" color="lightText" paddingHorizontal="xm" marginBottom="xm">
            מיקומכם יישמר על גבי מכשירכם בלבד ולא יעבור אלינו
          </Text>

          <RoundedButton
            text="פתיחת הגדרות המכשיר"
            onPress={() => {
              openSettings();
            }}
            color="yellow"
            style={{ marginBottom: 8 }}
            textStyle={{ fontWeight: 'bold' }}
          />
        </>
      );
    } else if (Platform.OS === 'android' && userLocationPermission === 'granted' && userCurrentPosition === undefined) {
      modalContent = (
        <>
          <Box backgroundColor="importantLight" width={250} padding="xm" paddingBottom="s" marginBottom="m" borderRadius={3}>
            <Text variant="importantText" textAlign="center" marginBottom="xm">
              שירותי המיקום מנוטרלים.
            </Text>
            <Text variant="importantText" fontWeight="500" textAlign="center" marginBottom="xm">
              על מנת למצוא הפגנות באיזורכם, יש לאפשר שימוש בשירותי המיקום.
            </Text>
          </Box>

          <RoundedButton
            text="הפעלת שירותי מיקום"
            onPress={() => requestLocation()}
            color="blue"
            style={{ marginBottom: 8 }}
            textStyle={{ fontWeight: 'bold' }}
          />
        </>
      );
    } else if (userLocationPermission !== 'granted' || userCurrentPosition?.length === 0) {
      modalContent = (
        <>
          <Image source={locationOffIcon} style={{ width: 75, height: 75, marginBottom: 16, tintColor: '#f67272' }} />
          <Text variant="boxTitle" textAlign="center" style={{ color: '#f67272' }} paddingHorizontal="xl" marginBottom="s">
            שירותי המיקום כבויים
          </Text>
          <Text variant="text" textAlign="center" color="lightText" paddingHorizontal="xm" marginBottom="xm">
            על מנת להכנס למצב הפגנה יש לאפשר שימוש בשירותי המיקום.
          </Text>
          <Text variant="text" textAlign="center" color="lightText" paddingHorizontal="xm" marginBottom="xm">
            מיקומכם נשמר על גבי מכשירכם בלבד ולא עובר אלינו.
          </Text>
          <RoundedButton text="הפעלת שירותי מיקום" onPress={() => requestLocation()} color="blue" style={{ marginBottom: 8 }} />
          <RoundedButton
            text="חזרה"
            onPress={() => setModalVisible(false)}
            color="grey"
            style={{ opacity: 0.45 }}
            textStyle={{ fontWeight: '500' }}
            transparent
          />
        </>
      );
    }
  }

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.825}
      animationIn="slideInUp"
      animationInTiming={375}
      animationOut="slideOutDown"
      animationOutTiming={350}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Box style={styles.modalWrapper}>{modalContent}</Box>
    </Modal>
  );
}
export default observer(RiotModeModal);

const modalHeight = Dimensions.get('screen').height * 0.48;

const styles = StyleSheet.create({
  modalImage: {
    width: 200,
    marginTop: 4,
    marginBottom: -6,
  },
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#111111',
  },
});
