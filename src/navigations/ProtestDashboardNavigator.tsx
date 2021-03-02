import React from 'react';
import { View, Platform, Pressable, StyleSheet } from 'react-native';
import ProtestDashboard from '@screens/ProtestDashboard';
import ProtestChat from '@screens/ProtestChat';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Box, CircularButton, CapturePicture } from '@components';
import EventPictureList from '@screens/EventPage/EventPictureList';
import { BlurView } from '@react-native-community/blur';

// Blurred view has lacking performance on android.
let headerBackground = () => <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#1e262d', elevation: 4 }]} />;

if (Platform.OS === 'ios') {
  headerBackground = () => (
    <BlurView blurType="thickMaterial" reducedTransparencyFallbackColor="#1e262d" style={StyleSheet.absoluteFill} />
  );
}

const ProtestDashboardStack = createStackNavigator();

function ProtestDashboardNavigator({ navigation }) {
  return (
    <ProtestDashboardStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
          marginBottom: Platform.select({ ios: 11, android: 2 }),
        },
        headerTintColor: '#8a8a8b',
        headerStyle: { backgroundColor: '#111111', shadowOpacity: 0 },
      }}
    >
      <ProtestDashboardStack.Screen
        name="Dashboard"
        component={ProtestDashboard}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Box flexDirection="row">
              <CircularButton
                onPress={() => {
                  navigation.goBack();
                }}
                iconName="x"
                color="grey"
                size="small"
                style={{ opacity: 0.8, marginLeft: 12, marginBottom: Platform.select({ ios: 6, android: 4 }) }}
              />
            </Box>
          ),
        }}
      />
      <ProtestDashboardStack.Screen
        name="EventPictureList"
        component={EventPictureList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerRightContainerStyle: { marginRight: 12 },
        }}
      />
      <ProtestDashboardStack.Screen
        name="ProtestChat"
        component={ProtestChat}
        options={{
          headerShown: true,
          headerTitle: 'צ׳אט',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTransparent: Platform.select({ ios: true, android: false }),
          headerBackground,
        }}
      />
      <ProtestDashboardStack.Screen
        name="ChatImageUpload"
        component={CapturePicture}
        options={{
          headerShown: false,
        }}
      />
    </ProtestDashboardStack.Navigator>
  );
}

export default ProtestDashboardNavigator;
