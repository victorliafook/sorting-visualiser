function Visualisation() {
  const queue = [];
  const sortables = [];

  this.run = () => {
    this.sketch = this.sketchFactory.getSketch();
    this.algorithm.sort(sortables);

    return this.sketch;
  };
  
  this.setSketchFactory = (sketchFactory) => {
    this.sketchFactory = sketchFactory;
    this.drawing && this.sketchFactory.setDrawing(this.drawing);
    
    return this;
  };

  this.setDomElement = (element) => {
    this.domElement = element;
    this.domElement.addEventListener('swap', swapHandler.bind(this));
    this.algorithm && this.algorithm.setEventEmitter(this.domElement);

    return this;
  };

  const swapHandler = (event) => {
    queue.push(event);
  };

  this.update = () => {
    const event = queue.shift();
    this.drawing.publish(event);
  };

  this.setDrawing = (drawing) => {
    this.drawing = drawing;
    this.sketchFactory && this.sketchFactory.setDrawing(this.drawing);

    return this;
  };

  this.setAlgorithm = (algorithm) => {
    this.algorithm = algorithm;
    this.eventFactory && this.algorithm.setEventFactory(this.eventFactory);
    this.domElement && this.algorithm.setEventEmitter(this.domElement);
    
    return this;
  };

  this.setEventFactory = (eventFactory) => {
    this.eventFactory = eventFactory;
    this.algorithm && this.algorithm.setEventFactory(this.eventFactory);

    return this;
  };

  this.setSortables = (array) => {
    sortables.length = 0;
    sortables.push(...array);

    return this;
  };
}

module.exports = Visualisation;