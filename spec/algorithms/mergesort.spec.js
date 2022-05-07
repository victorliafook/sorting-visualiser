const mergesort = require("../../src/algorithms/mergesort");
const { getRankableObj, buildArrayOfRankable } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe("Mergesort tests", function() {
  it("throws exception if trying to sort not Rankable elements", function() {
    const invalidArray = [{},1];
    expect(()=> mergesort.sort(invalidArray)).toThrowError(Error, "Attempted to compare not rankable element(s)");
  });

  it("sorts ascending", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      let sorted = mergesort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      let sorted = mergesort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("merges sorted consecutive subarrays", function() {
    const testCases = [
      { arrayInput: buildArrayOfRankable([1,3,5,7,9,0,2,6,10]), left: 0, rightStart: 5, rightEnd: 8, arrayOutput: [0,1,2,3,5,6,7,9,10] },
      { arrayInput: buildArrayOfRankable([6,7,8,9,10,0,1,2,3]), left: 0, rightStart: 5, rightEnd: 8, arrayOutput: [0,1,2,3,6,7,8,9,10] },
      { arrayInput: buildArrayOfRankable([1,3,0,7,9,10,5,5,5]), left: 0, rightStart: 2, rightEnd: 5, arrayOutput: [0,1,3,7,9,10,5,5,5] },
      { arrayInput: buildArrayOfRankable([5,5,5,7,9,10,2,3,5]), left: 3, rightStart: 6, rightEnd: 8, arrayOutput: [5,5,5,2,3,5,7,9,10] },
      { arrayInput: buildArrayOfRankable([1,1,3,3,2,2,4,4,10]), left: 0, rightStart: 4, rightEnd: 8, arrayOutput: [1,1,2,2,3,3,4,4,10] }
    ];

    testCases.forEach(testCase => {
      let merged = mergesort.merge(testCase.arrayInput, testCase.left, testCase.rightStart, testCase.rightEnd);
      expect(merged.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts stably", function() {
    let firstOne = getRankableObj(1);
    let secondOne = getRankableObj(1);
    let thirdOne = getRankableObj(1);

    const inputArray = [firstOne, getRankableObj(11), getRankableObj(-1), getRankableObj(2), getRankableObj(-4), getRankableObj(10), secondOne, thirdOne, getRankableObj(-7), getRankableObj(7)];

    let sorted = mergesort.sort([...inputArray]);

    expect(sorted.indexOf(firstOne) < sorted.indexOf(secondOne) && sorted.indexOf(secondOne) < sorted.indexOf(thirdOne)).toBe(true);
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

    mergesort.setEventEmitter(eventEmitter);
    mergesort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const swapEvent = {
      type: 'swap',
      detail: {
        card1: arr[0],card2: arr[1]
      }
    };

    mergesort.sort(arr);
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

    mergesort.setEventEmitter(eventEmitter);
    mergesort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const comparisonEvent = {
      type: 'comparison',
      detail: {
        card1: arr[0], card2: arr[1]
      }
    };
    mergesort.sort(arr);
    expect(eventEmitter.dispatchEvent).toHaveBeenCalledWith(jasmine.objectContaining(comparisonEvent));
  });
});