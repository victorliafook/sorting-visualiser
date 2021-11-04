const Drawing = require('../../src/ui/drawing');

describe('Drawing specs', function() {
  it('should draw every drawable', function() {
    const drawableOne = {
      draw: function(sketch) {
        
      }
    };

    const drawableTwo = {
      draw: function(sketch) {
        
      }
    };

    const drawing = new Drawing();
    drawing.add(drawableOne);
    drawing.add(drawableTwo);
    spyOn(drawableOne, 'draw');
    spyOn(drawableTwo, 'draw');

    drawing.draw();
    expect(drawableOne.draw).toHaveBeenCalledWith(drawing);
    expect(drawableTwo.draw).toHaveBeenCalledWith(drawing);
  });
});