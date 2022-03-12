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

  it('should notify subscribers for the right events when publish is called', function() {
    const subscriber1 = {notify: () => {}};
    const subscriber2 = {notify: () => {}};
    const subscriber3 = {notify: () => {}};
    spyOn(subscriber1, 'notify');
    spyOn(subscriber2, 'notify');
    spyOn(subscriber3, 'notify');

    const drawing = new Drawing();
    drawing.add(subscriber1);
    drawing.subscribe(subscriber1, 'swap');

    drawing.add(subscriber2);
    drawing.subscribe(subscriber2, 'highlight');

    drawing.add(subscriber3);
    drawing.subscribe(subscriber3, 'highlight');

    let eventMock = {type: 'swap', data: ''};
    drawing.publish(eventMock);
    expect(subscriber1.notify).toHaveBeenCalledWith(eventMock);
    expect(subscriber2.notify).not.toHaveBeenCalled();
    expect(subscriber2.notify).not.toHaveBeenCalled();

    eventMock = {type: 'highlight', data: '2'};
    drawing.publish(eventMock);
    expect(subscriber1.notify).not.toHaveBeenCalledWith(eventMock);
    expect(subscriber2.notify).toHaveBeenCalledWith(eventMock);
    expect(subscriber2.notify).toHaveBeenCalledWith(eventMock);
  });
});