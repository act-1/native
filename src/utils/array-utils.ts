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
