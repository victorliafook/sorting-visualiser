function partition(arr, start = 0, end) {
  end = end ?? arr.length - 1;
  let left = start+1;
  let right = end;
  let pivot = arr[start].key;
  while(true) {
      while(left <= right && arr[left].key <= pivot) {
        left++;
      }

      while(left <= right && arr[right].key > pivot) {
        right--;
      }

      if (left > right) break;

      [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  [arr[start], arr[right]] = [arr[right], arr[start]];
  return right;
}

function quicksort(arr, start = 0, end) {
  end = end ?? arr.length - 1;
  if (start >= end) return arr;

  let pivot = partition(arr, start, end);
  quicksort(arr, start, pivot-1);
  quicksort(arr, pivot+1, end);

  return arr;
}

module.exports = { 
  sort: quicksort,
  partition: partition
};