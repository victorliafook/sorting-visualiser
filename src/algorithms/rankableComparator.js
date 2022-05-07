function Comparator() {
  this.compare = function(rankable1, rankable2) {
    if (typeof rankable1.getRank !== 'function' || typeof rankable2.getRank !== 'function') {
      throw new Error("Attempted to compare not rankable element(s)");
    }
    return rankable1.getRank() - rankable2.getRank();
  };
}

module.exports = Comparator;