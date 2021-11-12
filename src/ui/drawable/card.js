const Card = function(pos, cardWidth = 30, suit, rank) {
  const position = {...pos};

  const width = cardWidth;
  const height = width * 1.3;
  const textSize = width/3;
  const cardPadding = width/10;
  const cardRadius = 5;

  const SUIT_HEARTS = 0;
  const SUIT_DIAMONDS = 1;
  const SUIT_CLUBS = 2;
  const SUIT_SPADES = 3;

  const draw = (closure) => {
    closure.stroke('black');
    closure.fill('white');
    closure.rect(position.x, position.y, width, height, cardRadius);
    
    closure.textSize(textSize);
    closure.fill(getSuitFillColour(suit));
    closure.textAlign(closure.LEFT);
    closure.text(rank, position.x + cardPadding, position.y + textSize);
    closure.textAlign(closure.RIGHT);
    closure.text(rank, position.x + width * 0.9, position.y + height - cardPadding);
  };

  const update = () => {

  };

  const getWidth = () => {
    return width;
  }

  const setPosition = (x, y) => {
    position.x = x;
    position.y = y;
  };

  const getRank = () => {
    return rank;
  };

  const getSuitFillColour = (suit) => {
    switch (suit) {
      case SUIT_HEARTS:
        return 'red';
      case SUIT_DIAMONDS:
        return 'red';
      default:
        return 'black';  
    }
  };

  return {
    draw,
    update,
    getRank,
    getWidth,
    setPosition,
    SUIT_HEARTS,
    SUIT_DIAMONDS,
    SUIT_CLUBS,
    SUIT_SPADES
  }
}

module.exports = Card;