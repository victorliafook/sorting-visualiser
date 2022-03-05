const merge = function (array, lStart, rStart, rEnd) {
  if (rStart > rEnd) return array;

  while (lStart < rEnd && rStart <= rEnd) {
    let left = array[lStart];
    let right = array[rStart];
    if (typeof left.getRank !== "function" || typeof right.getRank !== "function") {
      throw new Error("Cant sort not Rankable elements");
    }

    if (left.getRank() > right.getRank()) {
      shift(array, lStart, rStart);
      rStart++;
    }
    lStart++;
  }

  return array;
}

const shift = function (array, left, right) {
  while (right > left) {
    emitEvent(createEvent("swap", {
      card1: array[right - 1],
      card2: array[right]
    }));

    [array[right - 1], array[right]] = [array[right], array[right - 1]];
    right--;
  }
};

const sort = function (array) {
  return recursiveSort(array, 0, array.length - 1);
};

const recursiveSort = function (array, start, end) {
  if (start >= end) return array;

  let midIndex = Math.floor((end - start) / 2) + start;
  recursiveSort(array, start, midIndex);
  recursiveSort(array, midIndex + 1, end);

  return merge(array, start, midIndex + 1, end);
};

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

module.exports = { merge, sort, setEventEmitter, setEventFactory };