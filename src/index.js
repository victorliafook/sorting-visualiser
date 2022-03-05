const p5 = require("p5");
const Drawing = require('../src/ui/drawing');
const SketchFactory = require('../src/ui/sketchFactory');
const Board = require("./ui/drawable/board");
const Card = require("./ui/drawable/card");

const mergesort = require("./algorithms/mergesort");
const quicksort = require("./algorithms/quicksort");
const Visualisation = require("./ui/visualisation");

const mergesortDrawing = new Drawing();
const mergesortBoard = new Board(800, 200);
mergesortDrawing.add(mergesortBoard);

const quicksortDrawing = new Drawing();
const quicksortBoard = new Board(800, 200);
quicksortDrawing.add(quicksortBoard);

const cardsAttributes = getArrayOfRandomCardAttributes(20);

for(let cardAttribute of cardsAttributes) {
    let card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    mergesortBoard.addCard(card);

    card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    quicksortBoard.addCard(card);
}

const mergesortVisualizerAreaId = "visualiser-area-merge";
const quicksortVisualizerAreaId = "visualiser-area-quick";

const eventFactory = {
    createEvent: (eventName, data) => {
        return new CustomEvent(eventName, {detail: {...data}});
    }
};

const sketchConfig = {
    canvasDimensions: {
        width: 800,
        height: 200
    }
};
const sketchFactory = new SketchFactory(sketchConfig);

document.addEventListener('click', () => {
    visualisations.forEach(visualisation => {
        visualisation.update();
    });
});

const visualisations = [];

const mergeSortVisualisation = Visualisation();
mergeSortVisualisation.setAlgorithm(mergesort)
    .setSortables(mergesortBoard.getCards())
    .setDrawing(mergesortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(mergesortVisualizerAreaId));
new p5(mergeSortVisualisation.run(), document.getElementById(mergesortVisualizerAreaId));

visualisations.push(mergeSortVisualisation);

const quickSortVisualisation = Visualisation();
quickSortVisualisation.setAlgorithm(quicksort)
    .setSortables(quicksortBoard.getCards())
    .setDrawing(quicksortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(quicksortVisualizerAreaId));
new p5(quickSortVisualisation.run(), document.getElementById(mergesortVisualizerAreaId));

visualisations.push(quickSortVisualisation);

function getArrayOfRandomCardAttributes(length) {
    const cardAttributes = [];
    for(let i = 0; i < length; i++) {
        cardAttributes.push({
            suit: i % 4, 
            rank: Math.floor(Math.random() * (13 + 1)) + 2
        });
    }
    return cardAttributes;
}
