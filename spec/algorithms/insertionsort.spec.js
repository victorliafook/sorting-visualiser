const insertionsort = require("../../src/algorithms/insertionsort");
const {getRankableObj, buildArrayOfRankable } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe('Insertion Sort tests', function() {
  it("throws exception if trying to sort not Rankable elements", function() {
    const invalidArray = [{},1];
    expect(()=> insertionsort.sort(invalidArray)).toThrowError(Error);
  });

  it("sorts ascending - random tests", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      let sorted = insertionsort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      let sorted = insertionsort.sort(buildArrayOfRankable(testCase.arrayInput));
      expect(sorted.map(el => el.getRank())).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts stably", function() {
    let firstOne = getRankableObj(1);
    let secondOne = getRankableObj(1);
    let thirdOne = getRankableObj(1);

    const inputArray = [firstOne, getRankableObj(11), getRankableObj(-1), getRankableObj(2), getRankableObj(-4), getRankableObj(10), secondOne, thirdOne, getRankableObj(-7), getRankableObj(7)];

    let sorted = insertionsort.sort([...inputArray]);

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

    insertionsort.setEventEmitter(eventEmitter);
    insertionsort.setEventFactory(eventFactory);

    const arr = buildArrayOfRankable([2,1]);
    const swapEvent = {
      type: 'swap',
      detail: {
        card1: arr[0],card2: arr[1]
      }
    };
    insertionsort.sort(arr);
    expect(eventEmitter.dispatchEvent).toHaveBeenCalledWith(jasmine.objectContaining(swapEvent));
  });
});