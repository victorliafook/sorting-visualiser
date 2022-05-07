const ComparisonEventDecorator = require('./comparatorEventDecorator');
const RankableComparator = require('./rankableComparator');

const comparator = new ComparisonEventDecorator(new RankableComparator());

const merge = function (array, lStart, rStart, rEnd) {
  if (rStart > rEnd) return array;

  while (lStart < rEnd && rStart <= rEnd) {
    let left = array[lStart];
    let right = array[rStart];

    if (comparator.compare(left, right) > 0) {
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
  const sorted = recursiveSort(array, 0, array.length - 1);
  emitEvent(createEvent("comparison", {
    card1: null,
    card2: null
  }));

  return sorted;
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
  comparator.setEventEmitter(emitter);
};

const createEvent = function(type, data) {
  if (!eventFactory) return null;

  return eventFactory.createEvent(type, data);
}

let eventFactory;
const setEventFactory = function(factory) {
  eventFactory = factory;
  comparator.setEventFactory(factory);
}

module.exports = { merge, sort, setEventEmitter, setEventFactory };