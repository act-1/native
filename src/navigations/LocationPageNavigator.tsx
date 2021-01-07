import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Text } from '@components/';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SelectLocation, LocationPage } from '@screens/LocationPage';

const LocationStack = createStackNavigator();

function LocationPageNavigator({ navigation }) {
  return (
    <LocationStack.Navigator>
      <LocationStack.Screen
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
            color: '#6E7DFF',
            marginBottom: Platform.OS === 'ios' ? 11 : 2,
          },
          headerStatusBarHeight: Platform.OS === 'ios' ? 12 : 0, // Modal height issues on iOS
        }}
      />
      <LocationStack.Screen
        name="LocationPage"
        component={LocationPage}
        options={{
          headerShown: false,
        }}
      />
    </LocationStack.Navigator>
  );
}

export default LocationPageNavigator;

const styles = StyleSheet.create({
  dismissButton: {
    marginRight: 16,
    marginBottom: 2,
  },
});
