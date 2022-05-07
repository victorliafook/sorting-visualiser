const ComparisonEventDecorator = require('./comparatorEventDecorator');
const RankableComparator = require('./rankableComparator');

const comparator = new ComparisonEventDecorator(new RankableComparator());

function selectionsort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = array[i];
    let minIndex = i;
    
    for (let j = i + 1 ; j < array.length; j++) {
      if (comparator.compare(min, array[j]) > 0) {
        min = array[j];
        minIndex = j;
      }
    }

    if (array[i] !== min) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      emitEvent(createEvent('swap', {
        card1: array[minIndex], card2: array[i]
      }));
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
  sort: selectionsort,
  setEventEmitter,
  setEventFactory
}