import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Box, Text, RoundedButton } from '../';

function RiotModeModal({ isModalVisible, setModalVisible }: ModalProps) {
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
      <Box style={styles.modalWrapper}>
        <Text variant="hugeTitle">Hi</Text>
      </Box>
    </Modal>
  );
}
export default RiotModeModal;

const modalHeight = Dimensions.get('screen').height * 0.48;

const styles = StyleSheet.create({
  modalImage: {
    width: 200,
    marginTop: 4,
    marginBottom: -6,
  },
  modalWrapper: {
    height: modalHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 28,
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
