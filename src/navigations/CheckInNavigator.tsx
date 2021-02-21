import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text, CircularButton } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectLocation, LocationPage } from '@screens/LocationPage';
import { ProtestChat } from '@screens/ProtestChat';
import { CheckInForm } from '@screens/CheckIn';
import NewPost from '@screens/NewPost';
import HapticFeedback from 'react-native-haptic-feedback';

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
        headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
      }}
    >
      {/* <CheckInStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          title: 'צ׳ק אין',
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()} style={styles.dismissButton}>
              <Text color="lightText" fontSize={16}>
                ביטול
              </Text>
            </Pressable>
          ),
          headerTitleAlign: 'center',
          headerStatusBarHeight: Platform.OS === 'ios' ? 12 : 0, // Modal height issues on iOS
        }}
      />
      <CheckInStack.Screen name="CheckInForm" component={CheckInForm} options={{ headerShown: false }} /> */}
      <CheckInStack.Screen
        name="LocationPage"
        component={ProtestChat}
        options={{
          headerShown: true,
          headerTitle: 'בלפור',
          headerLeft: null,
          headerRightContainerStyle: { marginRight: 12 },
          headerLeft: () => (
            <Box flexDirection="row">
              <CircularButton
                onPress={() => {
                  HapticFeedback.trigger('impactLight');
                  navigation.goBack();
                }}
                iconName="x"
                color="grey"
                size="small"
                style={{ opacity: 0.8, marginLeft: 12, marginBottom: 8 }}
              />
            </Box>
          ),
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
