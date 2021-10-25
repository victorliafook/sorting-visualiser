const getKeyedObj = (key) => {
  return { key: key };
};

const buildKeyedArray = (arr) => {
  return arr.map(ele => getKeyedObj(ele));
};

module.exports = { getKeyedObj, buildKeyedArray };