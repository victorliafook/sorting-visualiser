const ComparisonEventDecorator = require('./comparatorEventDecorator');
const RankableComparator = require('./rankableComparator');

const comparator = new ComparisonEventDecorator(new RankableComparator());

function insertionsort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;

    while (j > 0 && comparator.compare(array[j-1], array[j]) > 0) {
      [array[j], array[j-1]] = [array[j-1], array[j]];
      emitEvent(createEvent('swap', {
        card1: array[j], card2: array[j-1]
      }));

      j--;
    }
  }

  emitEvent(createEvent('comparison', {
    card1: null, card2: null
  }));
  
  return array;
}

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

module.exports = {
  sort: insertionsort,
  setEventEmitter,
  setEventFactory
}