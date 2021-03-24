import { useState } from 'react';
import { RealtimeDatabase } from '@services/databaseWrapper';

/**
 * Subscribes to the total protesters counter updates.
 * @returns number - The counter total protesters counter.
 */
function useTotalCounter() {
  const [totalCounter, setTotalCounter] = useState(0);

  const totalCounterQuery = RealtimeDatabase.database.ref('totalCounter');

  totalCounterQuery.on(
    'value',
    (snapshot) => {
      let value = snapshot.val();
      setTotalCounter(value);
    },
    (err) => {
      throw err;
    }
  );

  return totalCounter;
}

export default useTotalCounter;
