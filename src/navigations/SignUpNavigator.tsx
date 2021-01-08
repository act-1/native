import React from 'react';
import { SafeAreaView, StyleSheet, Switch, TextInput } from 'react-native';
import { Box } from '../components';
import { RootStackParamList } from '../types/navigation';
// import { createStackNavigator } from 'react-native-screens/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const SignUpStack = createNativeStackNavigator<RootStackParamList>();

const SignUpModal = () => (
  <Box padding="m">
    <TextInput style={styles.textInputStyle} placeholder="כינוי" />
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      value={true}
    />
  </Box>
);

function SignUpNavigator() {
  return (
    <SignUpStack.Navigator screenOptions={{ headerShown: false, contentStyle: { paddingTop: 25 } }}>
      <SignUpStack.Screen name="SignUpScreen" component={SignUpModal} />
    </SignUpStack.Navigator>
  );
}

export default SignUpNavigator;

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderColor: '#f0f2f5',
    borderWidth: 1,
    textAlign: 'right',
    padding: 12,
    fontSize: 16,
    borderRadius: 3,
  },
});
