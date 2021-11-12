const mergesort = require("../../src/algorithms/mergesort");
const { getKeyedObj, buildKeyedArray } = require("../testHelper");
const { getRandomTestCases, getEdgeCases } = require("../sortingTests");

describe("Mergesort tests", function() {  
  it("sorts ascending", function() {
    const testCases = getRandomTestCases(100, 1000);

    testCases.forEach(testCase => {
      expect(mergesort.sort(buildKeyedArray(testCase.arrayInput))).toEqual(buildKeyedArray(testCase.arrayOutput));
    });
  });

  it("sorts ascending - edge cases", function() {
    const testCases = getEdgeCases();

    testCases.forEach(testCase => {
      expect(mergesort.sort(buildKeyedArray(testCase.arrayInput))).toEqual(buildKeyedArray(testCase.arrayOutput));
    });
  });

  it("merges sorted consecutive subarrays", function() {
    const testCases = [
      { arrayInput: buildKeyedArray([1,3,5,7,9,0,2,6,10]), left: 0, rightStart: 5, rightEnd: 8, arrayOutput: buildKeyedArray([0,1,2,3,5,6,7,9,10]) },
      { arrayInput: buildKeyedArray([6,7,8,9,10,0,1,2,3]), left: 0, rightStart: 5, rightEnd: 8, arrayOutput: buildKeyedArray([0,1,2,3,6,7,8,9,10]) },
      { arrayInput: buildKeyedArray([1,3,0,7,9,10,5,5,5]), left: 0, rightStart: 2, rightEnd: 5, arrayOutput: buildKeyedArray([0,1,3,7,9,10,5,5,5]) },
      { arrayInput: buildKeyedArray([5,5,5,7,9,10,2,3,5]), left: 3, rightStart: 6, rightEnd: 8, arrayOutput: buildKeyedArray([5,5,5,2,3,5,7,9,10]) },
      { arrayInput: buildKeyedArray([1,1,3,3,2,2,4,4,10]), left: 0, rightStart: 4, rightEnd: 8, arrayOutput: buildKeyedArray([1,1,2,2,3,3,4,4,10]) }
    ];

    testCases.forEach(testCase => {
      let merged = mergesort.merge(testCase.arrayInput, testCase.left, testCase.rightStart, testCase.rightEnd);
      expect(merged).toEqual(testCase.arrayOutput);
    });
  });

  it("sorts stably", function() {
    let firstOne = getKeyedObj(1);
    let secondOne = getKeyedObj(1);
    let thirdOne = getKeyedObj(1);

    const inputArray = [firstOne, getKeyedObj(11), getKeyedObj(-1), getKeyedObj(2), getKeyedObj(-4), getKeyedObj(10), secondOne, thirdOne, getKeyedObj(-7), getKeyedObj(7)];

    let sorted = mergesort.sort([...inputArray]);

    console.info('\nstable order:', sorted.indexOf(firstOne), sorted.indexOf(secondOne), sorted.indexOf(thirdOne));
    expect(sorted.indexOf(firstOne) < sorted.indexOf(secondOne) && sorted.indexOf(secondOne) < sorted.indexOf(thirdOne)).toBe(true);
  });

});