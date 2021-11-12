const SketchFactory = require('../../src/ui/sketchFactory');
const Drawing = require('../../src/ui/drawing');

describe('sketchFactory tests', function() {
  it('should setup and create canvas', function() {
    const config = {};
    config.canvasDimensions = {
      width: 9999, height: 999
    };

    const p5SketchFunctionFactory = new SketchFactory(config);
    const sketch = p5SketchFunctionFactory.getSketch();

    const p5Closure = {
      createCanvas: null, setup: null
    };
    
    spyOn(p5Closure, 'createCanvas');

    sketch(p5Closure);
    p5Closure.setup();

    expect(p5Closure.createCanvas).toHaveBeenCalledWith(config.canvasDimensions.width, config.canvasDimensions.height);
  });

  it('should assign drawing\'s draw function to closure', function() {
    const config = {};
    const p5SketchFunctionFactory = new SketchFactory(config);
    const drawing = new Drawing();
    p5SketchFunctionFactory.setDrawing(drawing);

    const sketch = p5SketchFunctionFactory.getSketch();
    const p5Closure = {
      draw: null
    };
    
    spyOn(drawing, 'draw');

    sketch(p5Closure);
    p5Closure.draw();

    expect(drawing.draw).toHaveBeenCalled();
  });
});