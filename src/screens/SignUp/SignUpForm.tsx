import React, { useState, useEffect, useRef } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { Box, EditProfilePicture } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import RoundedButton from '../../components/Buttons/RoundedButton';
import { updateUserProvince, updateUserDisplayName } from '@services/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckInService from '@services/checkIn';
import RNPickerSelect from 'react-native-picker-select';

type SignUpFormProps = {
  currentIndex?: number;
};

const isAndroid = Platform.OS === 'android';

/**
 * The sign up form can be shown from the onboarding screen, or as a standalone modal.
 *
 * In case the form is shown from the onboarding screen, the page `index` prop will be passed to the component,
 * allowing us to focus the text input once the component is shown.
 */
function SignUpForm({ currentIndex }: SignUpFormProps) {
  const store = useStore();
  const [isLoading, setLoading] = useState(false);
  const [province, setProvince] = useState('');
  const [displayName, setDisplayName] = useState('');

  const displayNameInput = useRef<TextInput>(null);
  const pickerRef = useRef<RNPickerSelect>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (currentIndex === 4) {
      displayNameInput!.current!.focus();
      // This helps edit profile picture to rerender - otherwise it won't show the profile picture initially, if the user is authed but not finished the signup.
      setProvince('');
    }
  }, [currentIndex]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateUserProvince(province);
      await updateUserDisplayName(displayName);
      analytics().logEvent('sign_up_form_submitted');
    } catch (err) {
      setLoading(false);
      console.log(err);
      crashlytics().recordError(err);
    }
  };

  return (
    <Box paddingVertical="xm" paddingHorizontal="m" style={{ paddingTop: insets.top + 40 }} flex={1}>
      <Box marginBottom="xm">
        <EditProfilePicture />
      </Box>

      <Box
        flexDirection="row"
        alignItems="baseline"
        paddingVertical="xm"
        paddingHorizontal="s"
        borderTopWidth={1}
        borderColor="seperator"
      >
        <TextInput
          ref={displayNameInput}
          style={styles.textInputStyle}
          accessibilityLabel="הזינו את שמכם"
          placeholder="הזינו את שמכם.ן"
          placeholderTextColor="#8d8d8d"
          onChangeText={(text) => setDisplayName(text)}
          returnKeyType={isAndroid ? undefined : 'next'}
          maxLength={38}
          onSubmitEditing={() => {
            pickerRef.current?.togglePicker();
          }}
        />
      </Box>
      <Box height={1} backgroundColor="seperator" style={{ marginBottom: 16 }} />

      <RNPickerSelect
        ref={pickerRef}
        placeholder={{ label: 'איזור מגורים', value: null, color: '#9EA0A4' }}
        doneText="סיום"
        onValueChange={(value) => setProvince(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          modalViewMiddle: {
            borderTopColor: '#2f2f2f',
            backgroundColor: '#2f2f2f',
          },
          modalViewBottom: {
            backgroundColor: '#2c2c2c',
          },

          placeholder: { fontSize: 20, fontWeight: 'bold', color: '#8d8d8d' },
          chevronContainer: { opacity: 0 },
          inputIOS: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff', marginBottom: 16 },
          inputAndroid: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff', marginBottom: 16, padding: 0 },
        }}
        items={[
          { label: 'הגליל העליון', value: 'הגליל העליון', color: '#fafafa' },
          { label: 'הגליל התחתון', value: 'הגליל התחתון', color: '#fafafa' },
          { label: 'חיפה והקריות', value: 'חיפה והקריות', color: '#fafafa' },
          { label: 'חוף הכרמל', value: 'חוף הכרמל', color: '#fafafa' },
          { label: 'ירושלים', value: 'ירושלים', color: '#fafafa' },
          { label: 'השרון', value: 'השרון', color: '#fafafa' },
          { label: 'תל אביב', value: 'תל אביב', color: '#fafafa' },
          { label: 'המרכז', value: 'המרכז', color: '#fafafa' },
          { label: 'השפלה', value: 'השפלה', color: '#fafafa' },
          { label: 'הנגב', value: 'הנגב', color: '#fafafa' },
          { label: 'חוף אשקלון ועוטף עזה', value: 'חוף אשקלון ועוטף עזה', color: '#fafafa' },
          { label: 'אילת והערבה', value: 'אילת והערבה', color: '#fafafa' },
        ]}
      />

      <Box height={1} backgroundColor="seperator" style={{ marginBottom: 24 }} />

      <Box flexDirection="row" justifyContent="center" borderColor="seperator" marginBottom="xm">
        <RoundedButton
          text="סיום הרשמה"
          color="blue"
          onPress={onSubmit}
          disabled={displayName.length < 2 || province?.length === 0}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
}

export default observer(SignUpForm);

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    textAlign: 'center',
    padding: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    borderColor: '#f0f2f5',
    borderRadius: 3,
  },
});
