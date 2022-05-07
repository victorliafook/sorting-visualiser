const selectionsort = require("../../src/algorithms/selectionsort");
const {getRankableObj, buildArrayOfRankable } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe('Selection Sort tests', function() {
  it("throws exception if trying to sort not Rankable elements", function() {
    const invalidArray = [{},1];
    expect(()=> selectionsort.sort(invalidArray)).toThrowError(Error, "Attempted to compare not rankable element(s)");
  });

  it("sorts ascending - random tests", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      let sorted = selectionsort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      let sorted = selectionsort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("dispatches swap events using an emitter", function() {
    const eventEmitter = {
      dispatchEvent: () => {}
    };
    const eventFactory = {
      createEvent: (eventName, data) => {
        return {type: eventName, detail: {...data}}
      }
    };
    
    spyOn(eventEmitter, "dispatchEvent");

    selectionsort.setEventEmitter(eventEmitter);
    selectionsort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const swapEvent = {
      type: 'swap',
      detail: {
        card1: arr[0],card2: arr[1]
      }
    };
    selectionsort.sort(arr);
    expect(eventEmitter.dispatchEvent).toHaveBeenCalledWith(jasmine.objectContaining(swapEvent));
  });

  it("dispatches comparison events using an emitter", function() {
    const eventEmitter = {
      dispatchEvent: () => {}
    };
    const eventFactory = {
      createEvent: (eventName, data) => {
        return {type: eventName, detail: {...data}}
      }
    };
    
    spyOn(eventEmitter, "dispatchEvent");

    selectionsort.setEventEmitter(eventEmitter);
    selectionsort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const comparisonEvent = {
      type: 'comparison',
      detail: {
        card1: arr[0], card2: arr[1]
      }
    };
    selectionsort.sort(arr);
    expect(eventEmitter.dispatchEvent).toHaveBeenCalledWith(jasmine.objectContaining(comparisonEvent));
  });
});