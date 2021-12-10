const Card = function(pos, cardWidth = 30, suit, rank) {
  const position = {...pos};
  const finalPosition = {...pos};

  const width = cardWidth;
  const height = width * 1.3;
  const textSize = width/3;
  const cardPadding = width/10;
  const cardRadius = 5;

  const UPDATE_SPEED = 3;

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
    let xDistance = position.x - finalPosition.x;
    let xSpeed = (xDistance === 0) ? 0 : (xDistance < 0) ? UPDATE_SPEED : -UPDATE_SPEED;
    let yDistance = position.y - finalPosition.y;
    let ySpeed = (yDistance === 0) ? 0 : (yDistance < 0) ? UPDATE_SPEED : -UPDATE_SPEED;
    
    position.x += Math.abs(xDistance) < UPDATE_SPEED ? -xDistance : xSpeed;
    position.y += Math.abs(yDistance) < UPDATE_SPEED ? -yDistance : ySpeed;
  };

  const moveTo = (targetPosition) => {
    validatePosition(targetPosition);
    setFinalPosition(targetPosition);
  };

  const validatePosition = (position) => {
    if (position === undefined || !Number.isInteger(position.x) || !Number.isInteger(position.y)) {
      throw new Error('moveTo expects x and y coordinates');
    }
  };

  const getWidth = () => {
    return width;
  }

  const setPosition = (targetPosition) => {
    position.x = targetPosition.x;
    position.y = targetPosition.y;

    setFinalPosition(targetPosition);
  };

  const setFinalPosition = (targetPosition) => {
    finalPosition.x = targetPosition.x;
    finalPosition.y = targetPosition.y;
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

  const getPosition = () => {
    return {...position};
  };

  return {
    draw,
    update,
    moveTo,
    getRank,
    getWidth,
    setPosition,
    getPosition,
    SUIT_HEARTS,
    SUIT_DIAMONDS,
    SUIT_CLUBS,
    SUIT_SPADES
  }
}

module.exports = Card;