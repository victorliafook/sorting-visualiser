const Board = function(width, height) {
  const padding = 5;
  const cards = [];
  let backgroundImg = null;

  const draw = (closure) => {
    if (backgroundImg === null) {
      backgroundImg = closure.createImage(width, height);
      backgroundImg.loadPixels();

      closure.noiseDetail(8, 0.5);
      noiseScale = 0.75;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          noiseVal = closure.noise(x * noiseScale, y * noiseScale);
          backgroundImg.set(x, y, closure.color(30, 150 + (noiseVal * 105), 30));
        }
      }
    }

    backgroundImg.updatePixels();
    closure.image(backgroundImg, 0, 0);

    cards.forEach(card => {
      card.draw(closure);
    })
  }

  const update = () => {
    cards.forEach(card => {
      card.update();
    })
  };

  const addCard = (card) => {
    let xPosition = (cards.length + 1) * padding + cards.length * card.getWidth();
    card.setPosition({x: xPosition, y: padding});
    cards.push(card);
  };

  return {
    draw,
    update,
    addCard
  }
}

module.exports = Board;