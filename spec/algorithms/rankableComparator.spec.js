const Comparator = require("../../src/algorithms/rankableComparator");

describe("RankableComparison tests", function() {
  it("returns a positive number if arg 1 > arg 2", function() {
    let rankable1 = { getRank: () => 10 };
    let rankable2 = { getRank: () => 2 };
    const comparator = new Comparator();
    
    expect(comparator.compare(rankable1, rankable2)).toBeGreaterThan(0);

    rankable1 = { getRank: () => 10 };
    rankable2 = { getRank: () => -20 };
    
    expect(comparator.compare(rankable1, rankable2)).toBeGreaterThan(0);
  });

  it("returns a negative number if arg 1 < arg 2", function() {
    let rankable1 = { getRank: () => 1 };
    let rankable2 = { getRank: () => 4 };
    
    const comparator = new Comparator();
    expect(comparator.compare(rankable1, rankable2)).toBeLessThan(0);

    rankable1 = { getRank: () => -10 };
    rankable2 = { getRank: () => 4 };
    
    expect(comparator.compare(rankable1, rankable2)).toBeLessThan(0);
  });

  it("returns 0 arg 1 == arg 2", function() {
    const rankable1 = { getRank: () => 1000 };
    const rankable2 = { getRank: () => 1000 };
    
    const comparator = new Comparator();
    expect(comparator.compare(rankable1, rankable2)).toEqual(0);
  });

  it("throws exception if trying to sort not Rankable elements", function() {
    const rankable1 = { getRank: () => 1000 };
    const rankable2 = {};

    const comparator = new Comparator();
    expect(()=>comparator.compare(rankable1, rankable2)).toThrowError(Error, "Attempted to compare not rankable element(s)");
  });
});