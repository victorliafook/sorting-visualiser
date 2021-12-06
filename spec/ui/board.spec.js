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

    const p5Closure = {};
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
});