import React, { useState } from 'react';
import { StyleSheet, Image, Platform, AppState, AppStateStatus, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { requestLocationPermission } from '@utils/location-utils';
import { openSettings } from 'react-native-permissions';
import Modal from 'react-native-modal';
import { Box, Text, RoundedButton } from '../';
import Ivrita from 'ivrita';
import { View as MotiView } from 'moti';

const locationOffIcon = require('@assets/icons/location-off.png');
const riotOnIcon = require('@assets/icons/riot-mode-on.png');

function RiotModeModal({ isModalVisible, setModalVisible }: ModalProps) {
  const { userStore, checkInStore } = useStore();
  const { currentCheckIn } = checkInStore;
  const { userLocationPermission, userCurrentPosition, userData } = userStore;
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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
    try {
      await requestLocationPermission();
      setIsLoadingLocation(true);
      await userStore.initUserLocation();
      await checkInStore.isRiotAround();
      setIsLoadingLocation(false);
    } catch (err) {
      setIsLoadingLocation(false);
      throw err;
    }
  };

  let modalContent = null;

  if (isLoadingLocation) {
    modalContent = (
      <Box minHeight={225} justifyContent="center">
        <ActivityIndicator size="large" color="grey" />
      </Box>
    );
  } else if (currentCheckIn) {
    modalContent = (
      <>
        <MotiView
          from={{ opacity: 1, scale: 1.075 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            loop: true,
            type: 'timing',
            duration: 1500,
            delay: 0,
          }}
        >
          <Image source={riotOnIcon} style={{ height: 90, resizeMode: 'contain', marginBottom: 12 }} />
        </MotiView>
        <Text variant="extraLargeTitle" color="green" textAlign="center" marginBottom="s">
          מצב הפגנה פעיל
        </Text>
        <Text variant="text" fontWeight="500" textAlign="center" marginBottom="l">
          {Ivrita.genderize('איתרנו הפגנה פעילה באיזורכם.ן', Ivrita[userData.pronoun])}
        </Text>
        <RoundedButton text="חזרה" onPress={() => setModalVisible(false)} color="yellow" />
      </>
    );
  } else if (userStore.userLocationPermission === 'granted') {
    modalContent = (
      <>
        <Image source={riotOnIcon} style={{ height: 90, resizeMode: 'contain', marginBottom: 12, opacity: 0.7 }} />
        <Text variant="extraLargeTitle" color="primaryColor" textAlign="center" marginBottom="s">
          מצב הפגנה כבוי
        </Text>
        <Text variant="text" fontWeight="500" color="lightText" textAlign="center" marginBottom="l">
          {Ivrita.genderize('מצב הפגנה יופעל אוטומטית כשתהיו קרובים.ות להפגנה פעילה', Ivrita[userData.pronoun])}
        </Text>
        <RoundedButton text="חזרה" onPress={() => setModalVisible(false)} color="yellow" style={{ opacity: 0.9 }} />
      </>
    );
  }

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
            מיקומכם יישמר במכשירכם בלבד ולא יעבור אלינו
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
              יש לאפשר שימוש בשירותי המיקום על מנת להכנס למצב הפגנה
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
          <Text variant="largeTitle" textAlign="center" style={{ color: '#f67272' }} paddingHorizontal="xl" marginBottom="m">
            שירותי המיקום כבויים
          </Text>
          <Text variant="text" textAlign="center" color="lightText" paddingHorizontal="xm" marginBottom="m">
            על מנת להכנס למצב הפגנה יש לאפשר שימוש בשירותי המיקום
          </Text>
          <Text variant="text" textAlign="center" color="lightText" paddingHorizontal="xm" marginBottom="l">
            מיקומכם יישמר במכשירכם בלבד ולא יעבור אלינו
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
    backgroundColor: '#1d1d1d',
  },
});
