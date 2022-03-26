function insertionsort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;

    if (typeof array[i].getRank !== "function") {
      throw new Error("Cant sort not Rankable elements");
    }

    while (j > 0 && array[j].getRank() < array[j-1].getRank()) {
      [array[j], array[j-1]] = [array[j-1], array[j]];
      emitEvent(createEvent('swap', {
        card1: array[j], card2: array[j-1]
      }));

      j--;
    }
  }

  return array;
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
  sort: insertionsort,
  setEventEmitter,
  setEventFactory
}