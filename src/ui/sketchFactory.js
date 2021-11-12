function SketchFactory(config) {
  const width = config?.canvasDimensions?.width;
  const height = config?.canvasDimensions?.height;
  
  let drawing;

  const getSketch = () => {
    return function(closure) {
      closure.setup = () => {
        closure.createCanvas(width, height);
      }
      
      closure.draw = drawing?.draw.bind(closure);
    }
  };

  const setDrawing = (drawable) => {
    drawing = drawable;
  }
  
  return {
    getSketch,
    setDrawing
  };
};

module.exports = SketchFactory;