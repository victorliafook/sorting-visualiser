ComparatorEventDecorator = function(comparator) {
  this.comparator = comparator;

  this.compare = (arg1, arg2) => {
    if (this.eventFactory) {
      const compareEvent = this.eventFactory.createEvent("comparison", {
        card1: arg1,
        card2: arg2
      });

      this.eventEmitter && this.eventEmitter.dispatchEvent(compareEvent);
    }

    return this.comparator.compare(arg1, arg2);
  };

  this.setEventFactory = (eventFactory) => {
    this.eventFactory = eventFactory;
  };

  this.setEventEmitter = (eventEmitter) => {
    this.eventEmitter = eventEmitter;
  };
}

module.exports = ComparatorEventDecorator;