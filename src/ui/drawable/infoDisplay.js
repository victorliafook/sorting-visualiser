const InfoDisplay = function() {
  let swapCounter = 0;
  let comparisonCounter = 0;
  let numberOfCards = 0;
  let title = '';
  const baseHeight = 120;
  const lineHeight = 15;

  const draw = (closure) => {
    closure.textSize(18);
    closure.textAlign(closure.LEFT);
    closure.text(title, 10, baseHeight);
    closure.textSize(13);
    closure.text(`# of cards: ${numberOfCards}`, 10, baseHeight + 1 * lineHeight);
    closure.text(`Swaps: ${swapCounter}`, 10, baseHeight + 2 * lineHeight);
    closure.text(`Comparisons: ${comparisonCounter}`, 10, baseHeight + 3 * lineHeight);
    closure.text(`Total Operations: ${comparisonCounter + swapCounter}`, 10, baseHeight + 4 * lineHeight);
  };

  const setTitle = (string) => {
    title = string;
  };

  const incrementSwap = () => {
    swapCounter++;
  };

  const incrementComparison = () => {
    comparisonCounter++;
  };

  const setNumberOfCards = (number) => {
    numberOfCards = number;
  };

  return {
    draw,
    incrementSwap,
    incrementComparison,
    setNumberOfCards,
    setTitle,
  }
};

module.exports = InfoDisplay;