import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text } from '@components/';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SelectLocation, LocationPage } from '@screens/LocationPage';

const CheckInStack = createStackNavigator();

function CheckInNavigator({ navigation }) {
  return (
    <CheckInStack.Navigator>
      <CheckInStack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          title: 'צ׳ק אין',
          headerTintColor: '#697CFF',
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()} style={styles.dismissButton}>
              <Text color="lightText" fontSize={16}>
                ביטול
              </Text>
            </Pressable>
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: 'Rubik-Medium',
            color: '#EC534B',
            marginBottom: Platform.OS === 'ios' ? 11 : 2,
          },
          headerStyle: { backgroundColor: '#1e262d', shadowOpacity: 0 },
          headerStatusBarHeight: Platform.OS === 'ios' ? 12 : 0, // Modal height issues on iOS
        }}
      />
      <CheckInStack.Screen
        name="LocationPage"
        component={LocationPage}
        options={{
          headerShown: false,
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
