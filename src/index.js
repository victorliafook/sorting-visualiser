const p5 = require("p5");
const canvasWidth = 800;
const canvasHeight = 400;
const visualizerAreaId = "visualizer-area";

const visualizerSketch = new p5((sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(canvasWidth, canvasHeight);
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(50);
        sketch.rect(50, 50, 50, 50);
    };
}, visualizerAreaId);