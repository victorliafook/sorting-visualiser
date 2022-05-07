const Decorator = require("../../src/algorithms/comparatorEventDecorator");

describe("ComparatorEventDecorator tests", function() {
  it("emits comparison event and calls comparator\'s compare method", function() {
    const eventMock = { mokito:true };

    const eventEmitterMock = { dispatchEvent: () => {} };
    const eventFactoryMock = { createEvent: () => {} };
    const comparatorMock = { compare: () => {} };

    spyOn(eventEmitterMock, 'dispatchEvent');
    spyOn(eventFactoryMock, 'createEvent').and.returnValue(eventMock);
    spyOn(comparatorMock, 'compare');

    const decorator = new Decorator(comparatorMock);
    decorator.setEventFactory(eventFactoryMock);
    decorator.setEventEmitter(eventEmitterMock);

    const rankable1 = { getRank: () => 10 };
    const rankable2 = { getRank: () => 2 };

    decorator.compare(rankable1, rankable2);
    const expectedEventData = {
      card1: rankable1, card2: rankable2
    };

    expect(comparatorMock.compare).toHaveBeenCalledWith(rankable1, rankable2);
    expect(eventEmitterMock.dispatchEvent).toHaveBeenCalledWith(eventMock);
    expect(eventFactoryMock.createEvent).toHaveBeenCalledWith("comparison", expectedEventData);
  });
});