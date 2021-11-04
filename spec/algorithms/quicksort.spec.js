const quicksort = require("../../src/algorithms/quicksort");
const { buildKeyedArray } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe('Quicksort tests', function() {
  it("sorts ascending - random tests", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      expect(quicksort.sort(buildKeyedArray(testCase.arrayInput))).toEqual(buildKeyedArray(testCase.arrayOutput));
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      expect(quicksort.sort(buildKeyedArray(testCase.arrayInput))).toEqual(buildKeyedArray(testCase.arrayOutput));
    });
  });

  it("partitions an array correctly", function() {
    const testCases = [
      { arrayInput: buildKeyedArray([1,3,5,7,9,0,2,6,10]), left: 0, right: 8, arrayOutput: buildKeyedArray([0,1,5,7,9,3,2,6,10]), pivot: 1 },
      { arrayInput: buildKeyedArray([6,7,8,9,10,0,1,2,3]), left: 0, right: 8, arrayOutput: buildKeyedArray([0,3,2,1,6,10,9,8,7]), pivot: 4 },
      { arrayInput: buildKeyedArray([1,3,0,7,9,10,5,5,5]), left: 0, right: 5, arrayOutput: buildKeyedArray([0,1,3,7,9,10,5,5,5]), pivot: 1 },
      { arrayInput: buildKeyedArray([5,5,5,7,9,10,2,3,5]), left: 3, right: 8, arrayOutput: buildKeyedArray([5,5,5,2,5,3,7,10,9]), pivot: 6 },
      { arrayInput: buildKeyedArray([1,1,3,3,2,2,4,4,10]), left: 0, right: 8, arrayOutput: buildKeyedArray([1,1,3,3,2,2,4,4,10]), pivot: 1 }
    ];

    testCases.forEach(testCase => {
      let inputCopy = [...testCase.arrayInput];
      let pivot = quicksort.partition(inputCopy, testCase.left, testCase.right);
      expect(pivot).toEqual(testCase.pivot);
      expect(inputCopy).toEqual(testCase.arrayOutput);
    });
  });
});