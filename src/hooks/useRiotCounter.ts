import { useState } from 'react';
import { RealtimeDatabase } from '@services/databaseWrapper';

/**
 * The hook subscribes to the total counter & the provided region counter.
 * @param regionName - The region name to subscribe to
 * @returns [number, number] - The counter for the current region and the total counter.
 */
function useRiotCounter(regionName: string) {
  const [regionCounter, setRegionCounter] = useState(0);
  const [totalCounter, setTotalCounter] = useState(0);

  const regionCounterQuery = RealtimeDatabase.database.ref('regionCounter').child(regionName);
  const totalCounterQuery = RealtimeDatabase.database.ref('totalCounter');

  regionCounterQuery.on('value', (snapshot) => {
    const value = snapshot.val();
    setRegionCounter(value);
  });

  totalCounterQuery.on('value', (snapshot) => {
    const value = snapshot.val();
    setTotalCounter(value);
  });

  return [regionCounter, totalCounter];
}

export default useRiotCounter;
