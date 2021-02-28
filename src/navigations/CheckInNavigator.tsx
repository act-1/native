import React from 'react';
import { View, Platform, Pressable, StyleSheet } from 'react-native';
import { Box, CircularButton } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import { CheckInPrivacy, SelectLocation } from '@screens/CheckIn';

const CheckInStack = createStackNavigator();

function CheckInNavigator({ navigation }) {
  return (
    <CheckInStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
          marginBottom: Platform.OS === 'ios' ? 11 : 2,
        },
        headerStatusBarHeight: Platform.select({ ios: 10, android: 0 }),
        headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
      }}
    >
      <CheckInStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <Box flexDirection="row">
              <CircularButton
                onPress={() => {
                  navigation.goBack();
                }}
                iconName="x"
                color="white"
                size="small"
                transparent
                style={{ opacity: 0.85, marginLeft: 12, marginBottom: 6 }}
              />
            </Box>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <CheckInStack.Screen
        name="CheckInPrivacy"
        component={CheckInPrivacy}
        options={{ title: "צ'ק אין", headerBackTitleVisible: false, headerTintColor: '#8a8a8b' }}
      />

      {/* <CheckInStack.Screen name="CheckInForm" component={CheckInForm} options={{ headerShown: false }} /> */}
    </CheckInStack.Navigator>
  );
}

export default CheckInNavigator;

const styles = StyleSheet.create({
  dismissButton: {
    marginRight: 16,
    marginBottom: 2,
  },
});
