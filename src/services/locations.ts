import firestore, { firebase, FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { GeoQuerySnapshot } from 'geofirestore-core';
import * as geofirestore from 'geofirestore';
import { Event, Location, SelectEntry, Region } from '@types/collections';

import events from './events';

// Create a GeoFirestore reference
const GeoFirestore = geofirestore.initializeApp(firestore());
const locationsCollection = GeoFirestore.collection('locations');

/**
 * Returns the current region name of the provided position.
 * @param position [number, number] - A geopoint ([latitude, longitude]).
 * @returns {Object} - The region's object.
 */
export async function getClosestLocation(position: [number, number]) {
  try {
    const [latitude, longitude] = position;

    const snapshot = await locationsCollection
      .near({ center: new firebase.firestore.GeoPoint(latitude, longitude), radius: 1.5 })
      .where('isActive', '==', true)
      .get();

    // TODO: Return nearest region
    console.log(snapshot.docs);
    if (snapshot.docs.length > 0) {
      const location = (snapshot.docs[0].data() as unknown) as Location;
      return location;
    }
    return null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// // Create a GeoCollection reference
// const locationCollection = GeoFirestore.collection('locations');
// const eventsCollection = GeoFirestore.collection('events');

// type NearbyLocationsParams = {
//   position: LatLng;
//   radius?: number;
// };

// export async function fetchLocation(locationId: string) {
//   try {
//     const locationDocumentSnapshot = await locationCollection.doc(locationId).get();
//     const locationData: any = locationDocumentSnapshot.data();
//     return locationData;
//   } catch (err) {
//     throw err;
//   }
// }

// /**
//  * Get locations around the provided position & radius.
//  * @param position The position to fetch locations around.
//  * @param radius The radius number to search for locations.
//  */
// export async function fetchNearbyLocations({ position, radius = 2 }: NearbyLocationsParams): Promise<GeoQuerySnapshot> {
//   try {
//     const [lat, lng] = position;
//     const query = locationCollection.near({
//       center: new firebase.firestore.GeoPoint(lat, lng),
//       radius,
//     });

//     return query.limit(5).get();
//   } catch (err) {
//     throw err;
//   }
// }

// /**
//  * Get upcoming events around the provided position & radius.
//  * @param position The position to fetch locations around.
//  * @param radius The radius number to search for locations.
//  */
// export async function fetchNearbyUpcomingEvents({ position, radius = 10 }: NearbyLocationsParams): Promise<GeoQuerySnapshot> {
//   try {
//     const [lat, lng] = position;

//     const query = eventsCollection.where('status', '==', 'upcoming').near({
//       center: new firebase.firestore.GeoPoint(lat, lng),
//       radius,
//     });
//     return query.limit(3).get();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// /**
//  * Get location & events around the provided position.
//  * If a location has an ongoing event, it'll be filtered.
//  * @param position The position to fetch locations around.

//  */
// export async function fetchNearbyEventsAndLocations({ position }: NearbyLocationsParams): Promise<SelectEntry[]> {
//   try {
//     const [locationsSnapshot, eventsSnapshot] = await Promise.all([
//       fetchNearbyLocations({ position }),
//       fetchNearbyUpcomingEvents({ position }),
//     ]);

//     const locationsData = locationsSnapshot.docs.map((doc: any): Location => ({ ...doc.data(), type: 'location' }));

//     // Since geofirestore doesn't allow us to filter by date, we need to do this by ourselves.
//     const now = new Date();

//     const eventsData = eventsSnapshot.docs
//       .map((doc: any): Event => ({ ...doc.data(), startDate: doc.data().startDate.toDate(), type: 'event' }))
//       .filter((event: any) => {
//         const twoHoursBeforeEvent = new Date(new Date(event.startDate).setHours(event.startDate.getHours() - 2)); // So events will show up 2 hours from their start;
//         return now > twoHoursBeforeEvent;
//       });
//     const eventLocationIds = eventsData.map((event: Event) => event.locationId);

//     // Filter locations that has an ongoing event
//     const filteredLocation = locationsData.filter((location) => !eventLocationIds.includes(location.id));
//     const locationsAndEventsData = [...eventsData, ...filteredLocation] as SelectEntry[];

//     return locationsAndEventsData;
//   } catch (err) {
//     throw err;
//   }
// }
