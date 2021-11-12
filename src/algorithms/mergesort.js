const merge = function (array, lStart, rStart, rEnd) {
  if (rStart > rEnd) return array;

  while (lStart < rEnd && rStart <= rEnd) {
    let left = array[lStart].key;
    let right = array[rStart].key;
    if (left > right) {
      shift(array, lStart, rStart);
      rStart++;
    }
    lStart++;
  }

  return array;
}

const shift = function (array, left, right) {
  while (right > left) {
    [array[right], array[right - 1]] = [array[right - 1], array[right]];
    right--;
  }
}

const sort = function (array) {
  return recursiveSort(array, 0, array.length - 1);
};

const recursiveSort = function (array, start, end) {
  if (start >= end) return array;

  let midIndex = Math.floor((end - start) / 2) + start;
  recursiveSort(array, start, midIndex);
  recursiveSort(array, midIndex + 1, end);

  return merge(array, start, midIndex + 1, end);
}

module.exports = { merge, sort };