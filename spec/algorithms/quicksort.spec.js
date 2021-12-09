const quicksort = require("../../src/algorithms/quicksort");
const { buildArrayOfRankable } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe('Quicksort tests', function() {
  it("throws exception if trying to sort not Rankable elements", function() {
    const invalidArray = [{},1];
    expect(()=> quicksort.sort(invalidArray)).toThrowError(Error);
  });

  it("sorts ascending - random tests", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      let sorted = quicksort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      let sorted = quicksort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("partitions an array correctly", function() {
    const testCases = [
      { arrayInput: buildArrayOfRankable([1,3,5,7,9,0,2,6,10]), left: 0, right: 8, arrayOutput: [0,1,5,7,9,3,2,6,10], pivot: 1 },
      { arrayInput: buildArrayOfRankable([6,7,8,9,10,0,1,2,3]), left: 0, right: 8, arrayOutput: [0,3,2,1,6,10,9,8,7], pivot: 4 },
      { arrayInput: buildArrayOfRankable([1,3,0,7,9,10,5,5,5]), left: 0, right: 5, arrayOutput: [0,1,3,7,9,10,5,5,5], pivot: 1 },
      { arrayInput: buildArrayOfRankable([5,5,5,7,9,10,2,3,5]), left: 3, right: 8, arrayOutput: [5,5,5,2,5,3,7,10,9], pivot: 6 },
      { arrayInput: buildArrayOfRankable([1,1,3,3,2,2,4,4,10]), left: 0, right: 8, arrayOutput: [1,1,3,3,2,2,4,4,10], pivot: 1 }
    ];

    testCases.forEach(testCase => {
      let inputCopy = [...testCase.arrayInput];
      let pivot = quicksort.partition(inputCopy, testCase.left, testCase.right);
      expect(pivot).toEqual(testCase.pivot);
      expect(inputCopy.map(el => el.getRank())).toEqual(testCase.arrayOutput);
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

    quicksort.setEventEmitter(eventEmitter);
    quicksort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const swapEvent = {
      type: 'swap',
      detail: {
        card1: arr[0],card2: arr[1]
      }
    };
    quicksort.sort(arr);
    expect(eventEmitter.dispatchEvent).toHaveBeenCalledWith(jasmine.objectContaining(swapEvent));
  });
});