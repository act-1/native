import React from 'react';
import { View, Platform, Pressable, StyleSheet } from 'react-native';
import ProtestDashboard from '@screens/ProtestDashboard';
import { ProtestChat } from '@screens/ProtestChat';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Box, CircularButton, CapturePicture } from '@components';
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
    <ProtestDashboardStack.Navigator>
      <ProtestDashboardStack.Screen name="ProtestDashboard" component={ProtestDashboard} />
      <ProtestDashboardStack.Screen
        name="ProtestChat"
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
