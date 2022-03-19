const InfoDisplay = function() {
  let swapCounter = 0;
  let numberOfCards = 0;
  let title = '';

  const draw = (closure) => {
    closure.textSize(20);
    closure.textAlign(closure.LEFT);
    closure.text(title, 10, 140);
    closure.textSize(15);
    closure.text(`# of cards: ${numberOfCards}`, 10, 160);
    closure.text(`Swaps: ${swapCounter}`, 10, 180);
  };

  const setTitle = (string) => {
    title = string;
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
    setTitle,
  }
};

module.exports = InfoDisplay;