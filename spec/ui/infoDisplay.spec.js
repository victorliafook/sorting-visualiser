const InfoDisplay = require('../../src/ui/drawable/infoDisplay');

describe('infoDisplay specs', function() {
  it('implements Drawable', function() {
    const info = new InfoDisplay();
    info.draw(getP5ClosureMock());
  });

  it('sets and displays title', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');

    const title = `some Title ${Math.random()}`;
    info.setTitle(title);
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith(title, 10, 140);
  });

  it('shows up right text size and alignment', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    spyOn(p5Mock, 'textSize');
    spyOn(p5Mock, 'textAlign');
    
    info.draw(p5Mock);

    expect(p5Mock.textSize).toHaveBeenCalledWith(20);
    expect(p5Mock.textAlign).toHaveBeenCalledWith(p5Mock.LEFT);
  });

  it('displays the number of swaps', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith('Swaps: 0', 10, 180);
  });

  it('displays the number of cards', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith('# of cards: 0', 10, 160);
  });

  it('updates the number of swaps', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');

    info.incrementSwap();
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith('Swaps: 1', jasmine.anything(), jasmine.anything());
  });

  it('updates the number of comparisons', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');

    info.incrementComparison();
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith('Comparisons: 1', jasmine.anything(), jasmine.anything());
  });

  const getP5ClosureMock = () => {
    return {
      text: () => {},
      textSize: () => {},
      textAlign: () => {},
      LEFT: 'left',
    };
  };
});