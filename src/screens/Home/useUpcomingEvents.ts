import { useMemo } from 'react';
import { removeArrayItem } from '@utils/array-utils';
import { Event, UpcomingEvent } from '@types/collections';

/**
 * The hook returns a tuple with the upcoming event that the user has attended, and the upcoming
 * event list with the user's upcoming event filtered out.
 */

type useUpcomingEventsProps = {
  upcomingEvents: UpcomingEvent[];
  userEventIds: string[];
};

type UpcomingEventsTuple = [UpcomingEvent | undefined, UpcomingEvent[]];

function useUpcomingEvents({ upcomingEvents, userEventIds }: useUpcomingEventsProps): UpcomingEventsTuple {
  const [nextEvent, events] = useMemo(() => {
    // Check if an upcoming eventId exists in the userEventIds
    // The upcomingEvents should come sorted, so we pick the closest event the user attended.

    let upcoming = upcomingEvents;
    const event = upcomingEvents.find((event: Event) => userEventIds.includes(event.id));

    if (event) {
      upcoming = removeArrayItem(upcoming, event);
    }

    return [event, upcoming];
  }, [upcomingEvents, userEventIds]);

  return [nextEvent, events];
}

export default useUpcomingEvents;
