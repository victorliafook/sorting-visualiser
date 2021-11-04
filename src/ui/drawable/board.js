const Board = function(width, height) {
  const padding = 5;
  const cards = [];

  const draw = (closure) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        closure.noiseDetail(8, 0.5);
        noiseScale = 0.75;
        noiseVal = closure.noise(x * noiseScale, y * noiseScale);
        closure.stroke(30, 150 + (noiseVal * 105), 30);
        closure.point(x, y);
      }
    }

    cards.forEach(card => {
      card.draw(closure);
    })
  }

  const addCard = (card) => {
    let xPosition = (cards.length + 1) * padding + cards.length * card.getWidth();
    card.setPosition(xPosition, padding);
    cards.push(card);
  };

  return {
    draw,
    addCard
  }
}

module.exports = Board;