import React from 'react';
import { View, Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text, CircularButton, CapturePicture } from '@components';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ProtestChat } from '@screens/ProtestChat';
import { CheckInPrivacy, SelectLocation } from '@screens/CheckIn';
import NewPost from '@screens/NewPost';
import { BlurView } from '@react-native-community/blur';

const CheckInStack = createStackNavigator();

// Blurred view has lacking performance on android.
let headerBackground = () => <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#1e262d', elevation: 4 }]} />;

if (Platform.OS === 'ios') {
  headerBackground = () => (
    <BlurView blurType="thickMaterial" reducedTransparencyFallbackColor="#1e262d" style={StyleSheet.absoluteFill} />
  );
}

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
      <CheckInStack.Screen
        name="LocationPage"
        component={ProtestChat}
        options={{
          headerShown: true,
          headerTitle: 'בלפור',
          headerLeft: null,
          headerTitleAlign: 'center',

          headerRightContainerStyle: { marginRight: 12 },
          headerLeft: () => (
            <Box flexDirection="row">
              <CircularButton
                onPress={() => {
                  navigation.goBack();
                }}
                iconName="x"
                color="grey"
                size="small"
                style={{ opacity: 0.8, marginLeft: 12, marginBottom: 6 }}
              />
            </Box>
          ),
          headerTransparent: Platform.select({ ios: true, android: false }),
          headerBackground,
        }}
      />
      <CheckInStack.Screen
        name="ChatImageUpload"
        component={CapturePicture}
        options={{
          headerShown: false,
        }}
      />
      <CheckInStack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          headerTitle: '',
          headerShown: true,
          headerRightContainerStyle: { marginRight: 12 },
          headerLeftContainerStyle: { marginLeft: 2, marginBottom: 4 },
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
          headerTintColor: '#e0e0e0',
          headerStatusBarHeight: 6,
        }}
      />
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
