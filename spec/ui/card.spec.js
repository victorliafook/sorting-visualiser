const Card = require("../../src/ui/drawable/card");
const { 
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  SUIT_SPADES
} = {...Card()};

describe('Card specs', function() {
  it('draws base card correctly', function() {
    const position = {
      x: 50,
      y: 299
    };
    const width = 30;
    const card = new Card(position, width);
    
    const p5Closure = {
      stroke: () => {},
      fill: () => {},
      rect: () => {},
      text: () => {},
      textSize: () => {},
      textAlign: () => {}
    };

    spyOn(p5Closure, 'stroke');
    spyOn(p5Closure, 'fill');
    spyOn(p5Closure, 'rect');

    card.draw(p5Closure);
    expect(p5Closure.stroke).toHaveBeenCalledWith('black');
    expect(p5Closure.fill).toHaveBeenCalledWith('white');
    expect(p5Closure.rect).toHaveBeenCalledWith(position.x, position.y, width, width * 1.3, jasmine.anything());
  });

  it('draws card suit and rank correctly', function() {
    const position = {
      x: 50,
      y: 299
    };
    const width = 30;
    const suits = [
      SUIT_HEARTS,
      SUIT_DIAMONDS,
      SUIT_CLUBS,
      SUIT_SPADES
    ];

    const cardsExpectations = [];
    for (let i = 0; i < 2; i++) {
      let rank = getRandomRank();
      let suit = suits[i];
      let colour = getExpectedSuitColour(suit);
      cardsExpectations.push({rank: rank, colour: colour, card: new Card(position, width, suit, rank)})
    }
    
    cardsExpectations.forEach(expectation => {
      let p5Closure = getP5ClosureMock();
      spyOn(p5Closure, 'stroke');
      spyOn(p5Closure, 'fill');
      spyOn(p5Closure, 'text');

      expectation.card.draw(p5Closure);
      expect(p5Closure.stroke).toHaveBeenCalledWith('black');
      expect(p5Closure.fill).toHaveBeenCalledWith(expectation.colour);
      expect(p5Closure.text.calls.allArgs()).toEqual(
        [
          [expectation.rank, jasmine.anything(), jasmine.anything()],
          [expectation.rank, jasmine.anything(), jasmine.anything()]
        ]
      );
    });
  });

  const getP5ClosureMock = () => {
    return {
      stroke: () => {},
      fill: () => {},
      rect: () => {},
      text: () => {},
      textSize: () => {},
      textAlign: () => {}
    };
  };

  const getRandomRank = () => {
    return Math.floor(Math.random() * (13 + 1)) + 2;
  };

  const getExpectedSuitColour = (suit) => {
    switch (suit) {
      case SUIT_HEARTS:
        return 'red';
      case SUIT_DIAMONDS:
        return 'red';
      default:
        return 'black';  
    }
  };

});