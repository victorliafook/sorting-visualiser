const Card = require("../../src/ui/drawable/card");

describe('Card specs', function() {
  it('implements Drawable', function() {
    const card = new Card({});
    card.update();
    card.draw(getP5ClosureMock());
  });

  it('implements Rankable', function() {
    const rank = getRandomRank();
    const card = new Card({}, 30, 0, rank);
    
    expect(card.getRank()).toEqual(rank);
  });

  it('implements Moveable', function() {
    const card = new Card({}, 30, 0);
    const position = {x:1,y:1};
    card.moveTo(position);

    expect(() => card.moveTo()).toThrowError(Error, 'moveTo expects x and y coordinates');
  });

  it('draws base card correctly', function() {
    const position = {
      x: 50,
      y: 299
    };
    const width = 30;
    const card = new Card(position, width);
    
    const p5Closure = getP5ClosureMock();
    spyOn(p5Closure, 'stroke');
    spyOn(p5Closure, 'fill');
    spyOn(p5Closure, 'rect');

    card.draw(p5Closure);
    expect(p5Closure.stroke).toHaveBeenCalledWith('grey');
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
      Card.SUIT_HEARTS,
      Card.SUIT_DIAMONDS,
      Card.SUIT_CLUBS,
      Card.SUIT_SPADES
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
      expect(p5Closure.fill).toHaveBeenCalledWith(expectation.colour);
      expect(p5Closure.text.calls.allArgs()).toEqual(
        [
          [expectation.rank, jasmine.anything(), jasmine.anything()],
          [expectation.rank, jasmine.anything(), jasmine.anything()]
        ]
      );
    });
  });

  it('returns its current position', function() {
    const position = {
      x: 50,
      y: 299
    };
    const card = new Card(position);

    expect(card.getPosition()).toEqual(position);
  });

  it('moves when updating and stops without flicker', function() {
    const cardSpeed = 3;
    const position = {
      x: 5,
      y: 299
    };
    const p5Closure = getP5ClosureMock();
    spyOn(p5Closure, 'rect');
    const card = new Card(position);

    card.moveTo({x:0, y:299});
    card.update();
    card.draw(p5Closure);
    expect(p5Closure.rect).toHaveBeenCalledWith(position.x - cardSpeed, 299, jasmine.anything(), jasmine.anything(), jasmine.anything());

    card.update();
    card.draw(p5Closure);
    expect(p5Closure.rect).toHaveBeenCalledWith(0, 299, jasmine.anything(), jasmine.anything(), jasmine.anything());
  });

  it('swaps its position with another card when notified of a swap event with a reference to itself as card1', function() {
    const card1Position = {x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10)};
    const card1 = new Card(card1Position);

    const mockPosition = { x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10) };
    const card2 = {
      getPosition: () => {
        return mockPosition;
      },
      moveTo: () => {},
    };
    const eventMock = {
      type: 'swap', detail: {
        card1: card1, card2: card2
      }
    };

    spyOn(card1, 'moveTo');
    spyOn(card2, 'moveTo');

    card1.notify(eventMock);

    expect(card1.moveTo).toHaveBeenCalledWith(card2.getPosition());
    expect(card2.moveTo).toHaveBeenCalledWith(card1Position);
  });

  it('moves to the counterpart\'s finalPosition during a swap, not the current position (while moving)', function() {
    const card1Position = {x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10)};
    const card1 = new Card(card1Position);

    const initialPosition = { x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10) };
    const card2 = new Card(initialPosition);
    const eventMock = {
      type: 'swap', detail: {
        card1: card1, card2: card2
      }
    };

    spyOn(card1, 'moveTo');

    const finalPosition = { x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*100) };
    card2.moveTo(finalPosition);
    card2.update();
    card2.update();
    card1.notify(eventMock);

    expect(card1.moveTo).toHaveBeenCalledWith(finalPosition);
  });

  it('switches highlight color when notified of a highlight event referencing itself', function() {
    const highlightColor = 150;
    const card1 = new Card();

    const eventMock = {
      type: 'highlight', detail: {
        cards: [card1]
      }
    };

    const closureMock = getP5ClosureMock();
    spyOn(closureMock, 'fill')
    
    card1.notify(eventMock);
    card1.draw(closureMock);

    expect(closureMock.fill).toHaveBeenCalledWith(highlightColor);
    closureMock.fill.calls.reset();

    card1.notify(eventMock);
    card1.draw(closureMock);

    expect(closureMock.fill).not.toHaveBeenCalledWith(highlightColor);
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
      case Card.SUIT_HEARTS:
        return 'red';
      case Card.SUIT_DIAMONDS:
        return 'red';
      default:
        return 'black';  
    }
  };
});
