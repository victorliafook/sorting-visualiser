const Drawing = function() {
  const drawingsSet = [];
  const subscribers = {};
  
  const draw = function() {
    this.clear();
    drawingsSet.forEach(drawing => {
      drawing.update();
      drawing.draw(this);
    });
  };

  const add = (drawable) => {
    drawingsSet.push(drawable)
  };

  const subscribe = (drawable, eventName) => {
    const subscriber = drawingsSet.find((element) => element === drawable);
    subscribers[eventName] = subscribers[eventName] ?? [];
    subscribers[eventName].push(subscriber);
  }

  const publish = (event) => {
    subscribers[event.type].forEach((subscriber) => {
      subscriber.notify(event);
    });
  }
  
  return {
    draw,
    add,
    subscribe,
    publish,
  };
};

module.exports = Drawing;