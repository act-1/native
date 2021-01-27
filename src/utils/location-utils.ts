import { Platform } from 'react-native';
import { check, PERMISSIONS, request, PermissionStatus } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function extractPositionCoords(position: Geolocation.GeoPosition): LatLng {
  if !(position) throw new Error("No position was provided.")
  const { coords } = position;
  const coordinates: LatLng = [coords.latitude, coords.longitude];
  return coordinates;
}

/**
 * Check if the user has granted location permission.
 */
export async function checkLocationPermission(): Promise<PermissionStatus> {
  const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await check(permissionType);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * Check if the user has granted location permission.
 */
export async function requestLocationPermission(): Promise<PermissionStatus> {
  const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await request(permissionType);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getCurrentPosition(): Promise<LatLng> {
  try {
    let coordinates: LatLng | undefined;
aimport { Platform } from 'react-native';
import { check, PERMISSIONS, request, PermissionStatus } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

function extractPositionCoords(position: Geolocation.GeoPosition): LatLng {
  if (!position) throw new Error('No position was provided.');
  const { coords } = position;
  const coordinates: LatLng = [coords.latitude, coords.longitude];
  return coordinates;
}

/**
 * Check if the user has granted location permission.
 */
export async function checkLocationPermission(): Promise<PermissionStatus> {
  const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await check(permissionType);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

/**
 * Check if the user has granted location permission.
 */
export async function requestLocationPermission(): Promise<PermissionStatus> {
  const permissionType = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await request(permissionType);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getCurrentPosition(): Promise<LatLng> {
  try {
    let coordinates: LatLng | undefined;

    if (Platform.OS === 'android') {
      coordinates = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve(extractPositionCoords(position));
          },
          (err) => {
            // Change GeoError to standard Error
            reject(new Error(err.message));
          }
        );
      });
    } else if (Platform.OS === 'ios') {
      let currentPosition: Geolocation.GeoPosition;

      // Using watchPosition because of https://github.com/Agontuk/react-native-geolocation-service/issues/212#issuecomment-728072176
      const watchId = Geolocation.watchPosition((latestPosition) => {
        currentPosition = latestPosition;
      });

      // Set 1.5s timeout to get the most accurate position information
      coordinates = await new Promise((resolve) =>
        setTimeout(() => {
          Geolocation.clearWatch(watchId);
          resolve(extractPositionCoords(currentPosition));
        }, 1500)
      );
    }

    if (coordinates === undefined) {
      throw new Error('Could not get user position.');
    }

    return coordinates;
  } catch (err) {
    throw err;
  }
}

    if (Platform.OS === 'android') {
      coordinates = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve(extractPositionCoords(position));
          },
          (err) => {
            // Change GeoError to standard Error
            reject(new Error(err.message));
          }
        );
      });
    } else if (Platform.OS === 'ios') {
      let currentPosition: Geolocation.GeoPosition;

      // Using watchPosition because of https://github.com/Agontuk/react-native-geolocation-service/issues/212#issuecomment-728072176
      const watchId = Geolocation.watchPosition((latestPosition) => {
        currentPosition = latestPosition;
      });

      // Set 1.5s timeout to get the most accurate position information
      coordinates = await new Promise((resolve) =>
        setTimeout(() => {
          Geolocation.clearWatch(watchId);
          resolve(extractPositionCoords(currentPosition));
        }, 1500)
      );
    }

    if (coordinates === undefined) {
      throw new Error('Could not get user position.');
    }

    return coordinates;
  } catch (err) {
    throw err;
  }
}
