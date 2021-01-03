import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { GeoQuerySnapshot } from 'geofirestore-core';
import * as geofirestore from 'geofirestore';

// Create a GeoFirestore reference
const GeoFirestore = geofirestore.initializeApp(firestore());

// Create a GeoCollection reference
const locationCollection = GeoFirestore.collection('locations');
// const eventsCollection = GeoFirestore.collection('locations');

type NearbyLocationsParams = {
  position: LatLng;
  radius?: number;
};

/**
 * Get locations around the provided position & radius.
 * @param position The position to fetch locations around.
 * @param radius The radius number to search for locations.
 */
export async function fetchNearbyLocations({ position, radius = 2.5 }: NearbyLocationsParams): Promise<GeoQuerySnapshot> {
  try {
    const [lat, lng] = position;
    const query = geocollection.near({
      center: new firebase.firestore.GeoPoint(lat, lng),
      radius,
    });

    return query.limit(5).get();
  } catch (err) {
    throw err;
  }
}
