const InfoDisplay = function() {
  let swapCounter = 0;
  let numberOfCards = 0;

  const draw = (closure) => {
    closure.textSize(20);
    closure.textAlign(closure.LEFT);
    closure.text(`# of cards: ${numberOfCards}`, 10, 160);
    closure.text(`Swaps: ${swapCounter}`, 10, 180);
  };

  const incrementSwap = () => {
    swapCounter++;
  };

  const setNumberOfCards = (number) => {
    numberOfCards = number;
  };

  return {
    draw,
    incrementSwap,
    setNumberOfCards,
  }
};

module.exports = InfoDisplay;