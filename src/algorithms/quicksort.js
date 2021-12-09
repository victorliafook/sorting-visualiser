function partition(array, start = 0, end) {
  end = end ?? array.length - 1;
  let left = start+1;
  let right = end;
  let pivot = array[start].getRank();
  while(true) {
      while(left <= right && array[left].getRank() <= pivot) {
        left++;
      }

      while(left <= right && array[right].getRank() > pivot) {
        right--;
      }

      if (left > right) break;

      emitEvent(createEvent("swap", {
        card1: array[left],
        card2: array[right]
      }));
      [array[left], array[right]] = [array[right], array[left]];
  }

  emitEvent(createEvent("swap", {
    card1: array[start],
    card2: array[right]
  }));
  [array[start], array[right]] = [array[right], array[start]];
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

const emitEvent = function(event) {
  eventEmitter && eventEmitter.dispatchEvent(event);
};

let eventEmitter;
const setEventEmitter = function(emitter) {
  eventEmitter = emitter;
};

const createEvent = function(type, data) {
  if (!eventFactory) return null;

  return eventFactory.createEvent(type, data);
}

let eventFactory;
const setEventFactory = function(factory) {
  eventFactory = factory;
}

module.exports = { 
  sort: quicksort,
  partition: partition,
  setEventFactory,
  setEventEmitter
};