const p5 = require("p5");
const Drawing = require('../src/ui/drawing');
const SketchFactory = require('../src/ui/sketchFactory');
const Board = require("./ui/drawable/board");
const Card = require("./ui/drawable/card");

const visualizerAreaId = "visualiser-area";
const config = {
    canvasDimensions: {
        width: 800,
        height: 400
    }
};

const sketchFactory = new SketchFactory(config);
const drawing = new Drawing();
const board = new Board(800, 400);
for(let i = 0; i < 8; i++) {
    board.addCard(new Card());
}
drawing.add(board);

sketchFactory.setDrawing(drawing);
const visualizerSketch = new p5(sketchFactory.getSketch(), visualizerAreaId);

/**
 * draw: for each drawable, update() and draw()
 */