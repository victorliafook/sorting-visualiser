const Board = require("../../src/ui/drawable/board");
const Card = require("../../src/ui/drawable/card");

describe('Board specs', function() {
  it('implements Drawable', function() {
    const board = new Board();
    board.update();
    board.draw(getP5ClosureMock());
  });

  it('draws its cards when drawing itself', function() {
    const board = new Board();

    const card1 = new Card();
    spyOn(card1, 'draw');
    
    const card2 = new Card();
    spyOn(card2, 'draw');

    board.addCard(card1);
    board.addCard(card2);

    const p5Closure = getP5ClosureMock();
    board.draw(p5Closure);

    expect(card1.draw).toHaveBeenCalledWith(p5Closure);
    expect(card2.draw).toHaveBeenCalledWith(p5Closure);
  });

  it('sets its cards on the right positions', function() {
    const board = new Board();

    const card1 = new Card();
    spyOn(card1, 'setPosition');
    
    const card2 = new Card();
    spyOn(card2, 'setPosition');

    board.addCard(card1);
    board.addCard(card2);

    const firstPosition = {x:5,y:5};
    const secondPosition = {x:40,y:5};
    expect(card1.setPosition).toHaveBeenCalledWith(firstPosition);
    expect(card2.setPosition).toHaveBeenCalledWith(secondPosition);
  });

  it('updates its cards when updating itself', function() {
    const board = new Board();

    const card1 = new Card();
    spyOn(card1, 'update');
    const card2 = new Card();
    spyOn(card2, 'update');

    board.addCard(card1);
    board.addCard(card2);

    board.update();
    expect(card1.update).toHaveBeenCalledWith();
    expect(card2.update).toHaveBeenCalledWith();
  });

  it('creates the background image only once', function() {
    const board = new Board();

    const p5Closure = getP5ClosureMock();
    spyOn(p5Closure, 'createImage').and.returnValue(getImageMock());
    spyOn(p5Closure, 'image');

    board.draw(p5Closure);
    board.draw(p5Closure);
    expect(p5Closure.createImage).toHaveBeenCalledTimes(1);
    expect(p5Closure.image).toHaveBeenCalledTimes(2);
  });

  it('returns a copy of its cards when getCards is called', function() {
    const board = new Board();

    const card1 = new Card({}, 0);
    board.addCard(card1);

    const card2 = new Card({}, 1);
    board.addCard(card2);

    const cards = board.getCards();
    expect(cards).toContain(jasmine.objectContaining(card1));
    expect(cards).toContain(jasmine.objectContaining(card2));
    expect(cards.length).toBe(2);
  });

  it('draws an InfoDisplay when it is set', function() {
    const board = new Board();
    const displayMock = {draw: () => {}, setTitle: () => {}};
    spyOn(displayMock, 'draw');
    board.setDisplay(displayMock);

    const p5Closure = getP5ClosureMock();
    board.draw(p5Closure);
    expect(displayMock.draw).toHaveBeenCalledWith(p5Closure);
  });

  it('sets the display\'s title when it is set up', function() {
    const board = new Board();
    const displayMock = {draw: () => {}, setTitle: () => {}};
    spyOn(displayMock, 'setTitle');
    board.setDisplay(displayMock);

    const title = `some time ${Math.random()}`;
    board.setTitle(title);
    expect(displayMock.setTitle).toHaveBeenCalledWith(title);
  });

  const getP5ClosureMock = () => {
    return {
      createImage: () => {
        return getImageMock();
      },
      image: () => {},
      noiseDetail: () => {},
      fill: () => {},
      rect: () => {},
      text: () => {},
      textSize: () => {},
      textAlign: () => {}
    };
  };

  const getImageMock = () => {
    return { 
      loadPixels: () => {},
      updatePixels: () => {}
    }
  };
});