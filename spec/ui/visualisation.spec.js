const Visualisation = require('../../src/ui/visualisation');

const sketchFactoryMock = {setDrawing: () => {}, getSketch: () => {}};
const documentMock = {
  addEventListener: function(eventName, handler) {
    this.handler = handler;
  },
  dispatchEvent: function(event) {
    this.handler(event)
  }
};
const domElementMock = {addEventListener: () => {}};
const drawingMock = {};
const algorithMock = {setEventFactory: () => {}, setEventEmitter: () => {}, sort: () => {}};
const eventFactoryMock = {createEvent: () => {}};

describe('visualisation tests', function() {
  it('sets sketchFactory\'s drawing when both are set in the Visualisation object', function() {
    spyOn(sketchFactoryMock, 'setDrawing');

    const visualisation = new Visualisation();
    visualisation.setSketchFactory(sketchFactoryMock)
      .setDrawing(drawingMock);

    expect(sketchFactoryMock.setDrawing).toHaveBeenCalledWith(drawingMock);
  });

  it('sets algorithm\'s event factory & emitter when both are set in the Visualisation object', function() {
    spyOn(algorithMock, 'setEventFactory');
    spyOn(algorithMock, 'setEventEmitter');

    spyOn(domElementMock, 'addEventListener');

    const visualisation = new Visualisation();
    visualisation
      .setDomElement(domElementMock)
      .setAlgorithm(algorithMock)
      .setEventFactory(eventFactoryMock);

    expect(algorithMock.setEventFactory).toHaveBeenCalledWith(eventFactoryMock);
    expect(algorithMock.setEventEmitter).toHaveBeenCalledWith(domElementMock);

    expect(domElementMock.addEventListener).toHaveBeenCalledWith('swap', jasmine.anything());
  });

  it('returns the sketch object when running the Visualisation', function() {
    const sketchMock = {mock: 1};
    spyOn(sketchFactoryMock, 'getSketch').and.returnValue(sketchMock);
    spyOn(algorithMock, 'sort');

    const visualisation = new Visualisation();
    visualisation.setSketchFactory(sketchFactoryMock)
      .setAlgorithm(algorithMock);
    
    const sketch = visualisation.run();
    
    expect(sketchFactoryMock.getSketch).toHaveBeenCalledTimes(1);
    expect(sketch).toBe(sketchMock);
  });

  it('gets calls the algorithm\'s sort function when running the Visualisation', function() {
    spyOn(sketchFactoryMock, 'getSketch');
    spyOn(algorithMock, 'sort');

    const cards = ['1'];
    const visualisation = new Visualisation();
    visualisation.setSketchFactory(sketchFactoryMock)
      .setAlgorithm(algorithMock)
      .setSortables(cards);
    
    visualisation.run();
    
    expect(algorithMock.sort).toHaveBeenCalledTimes(1);
    expect(algorithMock.sort).toHaveBeenCalledWith(cards);
  });

  it('consumes algorithm\'s events from queue when update() is called and notifies drawing - swaps cards', function() {
    let card1 = {moveTo: () => {}, getPosition: () => 1};
    let card2 = {moveTo: () => {}, getPosition: () => 2};
    spyOn(card1, 'moveTo');
    spyOn(card2, 'moveTo');

    const mockEvent1 = {detail: {card1: card1, card2: card2}};
    const mockEvent2 = {detail: {card1: card2, card2: card1}};
    algorithMock.sort = () => {
      documentMock.dispatchEvent(mockEvent1);
      documentMock.dispatchEvent(mockEvent2);
    };

    const drawingMock = {publish: () => {}};
    spyOn(drawingMock, 'publish');

    const visualisation = new Visualisation();
    visualisation.setSketchFactory(sketchFactoryMock)
      .setDomElement(documentMock)
      .setAlgorithm(algorithMock)
      .setDrawing(drawingMock);
    
    visualisation.run();

    visualisation.update();
    expect(card1.moveTo).toHaveBeenCalledWith(2);
    expect(card2.moveTo).toHaveBeenCalledWith(1);
    expect(drawingMock.publish).toHaveBeenCalledWith(mockEvent1);

    visualisation.update();
    expect(card1.moveTo).toHaveBeenCalledWith(2);
    expect(card2.moveTo).toHaveBeenCalledWith(1);
    expect(drawingMock.publish).toHaveBeenCalledWith(mockEvent2);
  });
});