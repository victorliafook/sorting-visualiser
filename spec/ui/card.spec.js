const Card = require("../../src/ui/drawable/card");

describe('Card specs', function() {
  it('draws correctly', function() {
    const position = {
      x: 50,
      y: 299
    };
    const width = 30
    const card = new Card(position.x, position.y, width);
    
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
});