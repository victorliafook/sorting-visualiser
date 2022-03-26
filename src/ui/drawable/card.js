const SUIT_HEARTS = 0,
  SUIT_DIAMONDS = 1,
  SUIT_CLUBS = 2,
  SUIT_SPADES = 3;

const Card = function(pos, cardWidth = 30, suit, rank) {
  const position = {...pos};
  const finalPosition = {...pos};

  const width = cardWidth;
  const height = width * 1.3;
  const textSize = width/3;
  const cardPadding = width/10;
  const cardRadius = 5;
  const highlightColor = 150;

  let highlighted = false;

  const UPDATE_SPEED = 3;

  this.draw = (closure) => {
    closure.stroke('grey');
    closure.fill(highlighted ? highlightColor : 'white');
    closure.rect(position.x, position.y, width, height, cardRadius);
    
    closure.textSize(textSize);
    closure.fill(getSuitFillColour(suit));
    closure.textAlign(closure.LEFT);
    closure.text(rank, position.x + cardPadding, position.y + textSize);
    closure.textAlign(closure.RIGHT);
    closure.text(rank, position.x + width * 0.9, position.y + height - cardPadding);
  };

  this.update = () => {
    let xDistance = position.x - finalPosition.x;
    let xSpeed = (xDistance === 0) ? 0 : (xDistance < 0) ? UPDATE_SPEED : -UPDATE_SPEED;
    let yDistance = position.y - finalPosition.y;
    let ySpeed = (yDistance === 0) ? 0 : (yDistance < 0) ? UPDATE_SPEED : -UPDATE_SPEED;
    
    position.x += Math.abs(xDistance) < UPDATE_SPEED ? -xDistance : xSpeed;
    position.y += Math.abs(yDistance) < UPDATE_SPEED ? -yDistance : ySpeed;
  };

  this.moveTo = (targetPosition) => {
    validatePosition(targetPosition);
    setFinalPosition(targetPosition);
  };

  const validatePosition = (position) => {
    if (position === undefined || !Number.isInteger(position.x) || !Number.isInteger(position.y)) {
      throw new Error('moveTo expects x and y coordinates');
    }
  };

  this.getWidth = () => {
    return width;
  }

  this.setPosition = (targetPosition) => {
    position.x = targetPosition.x;
    position.y = targetPosition.y;

    setFinalPosition(targetPosition);
  };

  const setFinalPosition = (targetPosition) => {
    finalPosition.x = targetPosition.x;
    finalPosition.y = targetPosition.y;
  };

  this.getRank = () => {
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

  this.getPosition = () => {
    return {...position};
  };

  this.notify = (event) => {
    if (event.type === 'swap') handleSwap(event);
    if (event.type === 'highlight') handleHighlight(event);
  };

  const handleSwap = (event) => {
    const card1 = event.detail.card1;
    const card2 = event.detail.card2;
    if (this === card1) this.moveTo(card2.getPosition());
    if (this === card2) this.moveTo(card1.getPosition());
  }

  const handleHighlight = (event) => {
    if (event.detail.cards.indexOf(this) >= 0) {
      highlighted = !highlighted;
    }
  };
}

Card.SUIT_HEARTS = SUIT_HEARTS,
Card.SUIT_DIAMONDS = SUIT_DIAMONDS,
Card.SUIT_CLUBS = SUIT_CLUBS,
Card.SUIT_SPADES = SUIT_SPADES;

module.exports = Card;