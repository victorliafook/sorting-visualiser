function bubblesort(array) {
  let swapped = true;
  while(swapped) {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (typeof array[i].getRank !== "function") {
        throw new Error("Cant sort not Rankable elements");
      }

      if (array[i].getRank() < array[i-1].getRank()) {
        [array[i], array[i-1]] = [array[i-1], array[i]];
        emitEvent(createEvent('swap', {
          card1: array[i], card2: array[i-1]
        }));
        swapped = true;
      }
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
  sort: bubblesort,
  setEventEmitter,
  setEventFactory
}