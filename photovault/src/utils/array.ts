/**
 * Expands an array with it's repeated values until it reaches a desired minimal length.
 * If the length of the array is bigger than the minimal length, then the original array is returned.
 * @param array Array to be expanded
 * @param minLength Minimal length of the result
 */
export function extendWithDuplicates<T>(array: Array<T>, minLength: number) {
  if (array.length >= minLength) {
    return array;
  } else {
    const result: Array<T> = [];

    for (let i = 0; i < minLength; ++i) {
      result.push(array[i % array.length]);
    }

    return result;
  }
}
