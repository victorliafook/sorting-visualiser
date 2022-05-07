const InfoDisplay = require('../../src/ui/drawable/infoDisplay');

describe('infoDisplay specs', function() {
  const leftPadding = 10;
  const lineHeight = 15;
  const baseHeight = 120;

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

    expect(p5Mock.text).toHaveBeenCalledWith(title, leftPadding, baseHeight);
  });

  it('shows up right text size and alignment', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    spyOn(p5Mock, 'textSize');
    spyOn(p5Mock, 'textAlign');
    
    info.draw(p5Mock);

    expect(p5Mock.textSize).toHaveBeenCalledWith(18);
    expect(p5Mock.textAlign).toHaveBeenCalledWith(p5Mock.LEFT);
  });

  it('displays the number of cards', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    spyOn(p5Mock, 'textSize');
    info.draw(p5Mock);

    expect(p5Mock.textSize).toHaveBeenCalledWith(13);
    expect(p5Mock.text).toHaveBeenCalledWith('# of cards: 0', leftPadding, baseHeight + 1 * lineHeight);
  });

  it('displays the number of swaps', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    spyOn(p5Mock, 'textSize');
    info.draw(p5Mock);

    expect(p5Mock.textSize).toHaveBeenCalledWith(13);
    expect(p5Mock.text).toHaveBeenCalledWith('Swaps: 0', leftPadding, baseHeight + 2 * lineHeight);
  });

  it('displays the number of comparisons', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');
    spyOn(p5Mock, 'textSize');
    info.draw(p5Mock);

    expect(p5Mock.textSize).toHaveBeenCalledWith(13);
    expect(p5Mock.text).toHaveBeenCalledWith('Comparisons: 0', leftPadding, baseHeight + 3 * lineHeight);
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

  it('updates the totals', function() {
    const info = new InfoDisplay();
    const p5Mock = getP5ClosureMock();
    spyOn(p5Mock, 'text');

    info.incrementComparison();
    info.incrementSwap();
    info.incrementComparison();
    info.draw(p5Mock);

    expect(p5Mock.text).toHaveBeenCalledWith('Total Operations: 3', leftPadding, baseHeight + 4 * lineHeight);
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