const MAX_VALUE = 1000;

const getRandomTestCases = (nOfTestCases, arrayLength) => {
  const testCases = [];
  for (let i = 0; i < nOfTestCases; i++) {
    testCases.push(createRandomTestCase(arrayLength));
  }

  return testCases;
};

const createRandomTestCase = (arrayLength) => {
  const testCase = {};
  const arrayInput = [];
  for (let i = 0; i < arrayLength; i++) {
    let num = Math.floor(Math.random() * (MAX_VALUE + 1));
    //we dont want to have -0 on the test cases as they mess up Jasmine's toEqual matcher
    let sign = Math.floor(Math.random() * 2) === 0 && num !== 0 ? 1 : -1;
    arrayInput.push(sign * num);
  }

  testCase.arrayInput = arrayInput;
  testCase.arrayOutput = [...arrayInput];
  testCase.arrayOutput.sort(ascending)

  return testCase;
}

const ascending = (a, b) => {
  return a - b;
}

const getEdgeCases = () => {
  const testCases = [
    { arrayInput: [], arrayOutput: [] },
    { arrayInput: [1], arrayOutput: [1] },
    { arrayInput: [2,1], arrayOutput: [1,2] },
  ];

  return testCases;
};

module.exports = { 
  getRandomTestCases,
  getEdgeCases
}