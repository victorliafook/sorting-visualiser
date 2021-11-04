const Card = function(x, y, cardWidth = 30) {
  const position = {
    x: x, y: y
  };

  const width = cardWidth;
  const textSize = width/3;
  const cardPadding = width/10;
  const cardRadius = 5;

  const draw = (closure) => {
    closure.stroke('black');
    closure.fill('white');
    closure.rect(position.x, position.y, width, width*1.3, cardRadius);
    
    closure.textSize(textSize);
    closure.fill('red');
    closure.textAlign(closure.LEFT);
    closure.text(2, position.x + cardPadding, position.y + textSize);
    closure.textAlign(closure.RIGHT);
    closure.text(2, position.x + width * 0.9, position.y + width * 1.3 - cardPadding);
  };

  const getWidth = () => {
    return width;
  }

  const setPosition = (x, y) => {
    position.x = x;
    position.y = y;
  };

  return {
    draw,
    getWidth,
    setPosition,
  }
}

module.exports = Card;