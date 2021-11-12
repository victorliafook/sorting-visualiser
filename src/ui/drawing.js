const Drawing = function() {
  const drawingsSet = [];
  
  const draw = function() {
    drawingsSet.forEach(drawing => {
      drawing.update();
      drawing.draw(this);
    });
  };

  const add = (drawable) => {
    drawingsSet.push(drawable)
  };
  
  return {
    draw,
    add
  };
};

module.exports = Drawing;