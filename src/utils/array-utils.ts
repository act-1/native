export function findArrayIndexById(array: [], id: string) {
  const index = array.findIndex((item: any) => item.id === id);
  if (index === -1) throw new Error('Array item not found.');
  return index;
}

/**
 *
 * @param array - The array to update.
 * @param index - Which array index to update.
 * @param updatedItem - The updated item.
 */
export function updateArrayItem(array: any[], index: number, updatedItem: any) {
  const updatedArray = [...array.slice(0, index), updatedItem, ...array.slice(index + 1)];
  return updatedArray;
}

export function updateArrayByObjectId(arr, id, updatedFields) {
  const index = findArrayIndexById(arr, id);

  const obj = arr[index];
  const updateObj = { ...obj, ...updatedFields };
  const updatedArray = [...arr.slice(0, index), updateObj, ...arr.slice(index + 1)];
  return updatedArray;
}

/**
 * Slice array to chunks of `n` elements.
 * @param array The array to split.
 * @param size The size of elements in each array chunk.
 */
export function chunkArray(array: Array<any>, size: number) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

/**
 * Removes the provided item from the array.
 * @param array The array to update.
 * @param item The item to remove from the array.
 * @returns A new array without the provided item.
 */
export function removeArrayItem(array: Array<any>, item: any) {
  return array.filter((value) => item !== value);
}
