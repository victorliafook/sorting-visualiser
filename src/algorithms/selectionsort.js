function selectionsort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = array[i];
    let minIndex = i;
    
    for (let j = i + 1 ; j < array.length; j++) {
      if (typeof array[i].getRank !== "function" || typeof array[j].getRank !== "function") {
        throw new Error("Cant sort not Rankable elements");
      }

      if (array[j].getRank() < min.getRank()) {
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
  sort: selectionsort,
  setEventEmitter,
  setEventFactory
}