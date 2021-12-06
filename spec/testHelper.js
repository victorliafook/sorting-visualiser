const getRankableObj = (key) => {
  return { getRank: () => key };
};

const buildArrayOfRankable = (arr) => {
  return arr.map(ele => getRankableObj(ele));
};

module.exports = { getRankableObj, buildArrayOfRankable };