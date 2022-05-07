const ComparisonEventDecorator = require('./comparatorEventDecorator');
const RankableComparator = require('./rankableComparator');

const comparator = new ComparisonEventDecorator(new RankableComparator());

function bubblesort(array) {
  let swapped = true;
  while(swapped) {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (comparator.compare(array[i-1], array[i]) > 0) {
        [array[i], array[i-1]] = [array[i-1], array[i]];
        emitEvent(createEvent('swap', {
          card1: array[i], card2: array[i-1]
        }));
        swapped = true;
      }
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
  sort: bubblesort,
  setEventEmitter,
  setEventFactory
}