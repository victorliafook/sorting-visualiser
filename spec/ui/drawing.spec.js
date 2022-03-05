const Drawing = require('../../src/ui/drawing');

describe('Drawing specs', function() {
  it('should update and draw every drawable and clear upon calling draw()', function() {
    const drawableOne = {
      draw: function(sketch) {},
      update: function() {},
    };

    const drawableTwo = {
      draw: function(sketch) {},
      update: function() {},
    };

    const drawing = new Drawing();
    drawing.add(drawableOne);
    drawing.add(drawableTwo);
    spyOn(drawableOne, 'draw');
    spyOn(drawableOne, 'update');
    spyOn(drawableTwo, 'draw');
    spyOn(drawableTwo, 'update');

    const closureMock = {
      clear: () => {}
    };
    spyOn(closureMock, 'clear');
    drawing.draw.call(closureMock);

    expect(drawableOne.draw).toHaveBeenCalledWith(closureMock);
    expect(drawableTwo.draw).toHaveBeenCalledWith(closureMock);

    expect(drawableOne.update).toHaveBeenCalled();
    expect(drawableTwo.update).toHaveBeenCalled();

    expect(closureMock.clear).toHaveBeenCalled();
  });
});