import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Box, Text, CircularButton } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import ActionScreen from '@screens/Action';

const ActionStack = createStackNavigator();

function ActionNavigator({ navigation }) {
  return (
    <ActionStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: 'AtlasDL3.1AAA-Medium',
          color: '#EC534B',
          marginBottom: Platform.OS === 'ios' ? 11 : 2,
        },
        headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
        headerStatusBarHeight: Platform.OS === 'ios' ? 12 : 0, // Modal height issues on iOS
      }}
    >
      <ActionStack.Screen name="ActionScreen" component={ActionScreen} options={{ headerTitle: 'יוצאים להפגין' }} />
    </ActionStack.Navigator>
  );
}

export default ActionNavigator;

const styles = StyleSheet.create({
  dismissButton: {
    marginRight: 16,
    marginBottom: 2,
  },
});
