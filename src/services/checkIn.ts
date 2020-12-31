import functions from '@react-native-firebase/functions';
import { createTimestamp } from '@utils/date-utils';

export async function createUserCheckIn(locationId: string, eventId?: string) {
  try {
    const result = await functions().httpsCallable('userCheckIn')({ locationId, eventId });
    const { checkIn } = result.data;

    // Convert firebase timestamps to dates.
    const { createdAt, expireAt } = checkIn;
    const createdAtDate = createTimestamp(createdAt._seconds, createdAt._nanoseconds).toDate();
    const expireAtDate = createTimestamp(expireAt._seconds, expireAt._nanoseconds).toDate();

    return { ok: true, checkIn: { ...checkIn, createdAt: createdAtDate, expireAt: expireAtDate } };
  } catch (err) {
    throw err;
  }
}
