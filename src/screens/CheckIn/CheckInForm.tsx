import React from 'react';
import { KeyboardAvoidingView, TextInput, Platform, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Box, Text } from '../../components';
import { RoundedButton, CircularButton } from '@components/Buttons';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import Icon from 'react-native-vector-icons/Feather';
import { CheckInFormScreenProps } from '@types/navigation';

function CheckInForm({ navigation }: CheckInFormScreenProps) {
  // const store = useStore();

  return (
    <Box flex={1}>
      <Box height={80} backgroundColor="seperator" flexDirection="row" alignItems="center" paddingHorizontal="m">
        <Box flexDirection="row" alignItems="center" flex={1}>
          <FastImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/13344923?s=460&u=608d14c4d6c542d8f173dc2093e1763a7d18794c&v=4',
            }}
            style={styles.profilePicture}
          />
          <Box marginLeft="m">
            <Text variant="boxTitle" fontSize={16}>
              כיכר פריז
            </Text>
            <Box flexDirection="row" alignItems="center">
              <Text variant="text" marginRight="xxs">
                שינוי מיקום
              </Text>
              <Icon name="chevron-down" size={16} color="white" />
            </Box>
          </Box>
        </Box>
        <Box>
          <CircularButton color="black" iconName="lock" size="large" iconSize={18} />
        </Box>
      </Box>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Box margin="m" flexGrow={3}>
          <TextInput
            keyboardAppearance="dark"
            placeholder="מסר לאומה..."
            placeholderTextColor="#737373"
            style={styles.textInput}
            autoFocus={true}
            autoCorrect={false}
            multiline={true}
            maxLength={142}
          />
        </Box>

        <Box flexDirection="row" alignItems="center" flex={1}>
          <Box flex={1} marginLeft="m">
            <RoundedButton color="grey" text="ביטול" style={{ width: '100%' }} onPress={() => navigation.navigate('Home')} />
          </Box>
          <Box flex={1} marginHorizontal="m">
            <RoundedButton color="blue" text="צ׳ק אין" style={{ width: '100%' }} />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
}

export default observer(CheckInForm);

const styles = StyleSheet.create({
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  textInput: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 24,
  },
});
