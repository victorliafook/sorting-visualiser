const Drawing = require('../../src/ui/drawing');

describe('Drawing specs', function() {
  it('should update and draw every drawable', function() {
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

    drawing.draw();
    expect(drawableOne.draw).toHaveBeenCalledWith(drawing);
    expect(drawableTwo.draw).toHaveBeenCalledWith(drawing);

    expect(drawableOne.update).toHaveBeenCalled();
    expect(drawableTwo.update).toHaveBeenCalled();
  });
});