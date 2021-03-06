const p5 = require("p5");
const Drawing = require('../src/ui/drawing');
const SketchFactory = require('../src/ui/sketchFactory');
const Board = require("./ui/drawable/board");
const Card = require("./ui/drawable/card");

const mergesort = require("./algorithms/mergesort");
const quicksort = require("./algorithms/quicksort");
const insertionsort = require("./algorithms/insertionsort");
const selectionsort = require("./algorithms/selectionsort");
const bubblesort = require("./algorithms/bubblesort");

const Visualisation = require("./ui/visualisation");
const InfoDisplay = require("./ui/drawable/infoDisplay");

const mergesortDrawing = new Drawing();
const mergesortBoard = new Board(800, 200);
mergesortBoard.setTitle('MergeSort (in-place)');
mergesortBoard.setDisplay(new InfoDisplay());
mergesortDrawing.add(mergesortBoard);
mergesortDrawing.subscribe(mergesortBoard, 'swap');
mergesortDrawing.subscribe(mergesortBoard, 'comparison');

const quicksortDrawing = new Drawing();
const quicksortBoard = new Board(800, 200);
quicksortBoard.setTitle('QuickSort');
quicksortBoard.setDisplay(new InfoDisplay());
quicksortDrawing.add(quicksortBoard);
quicksortDrawing.subscribe(quicksortBoard, 'swap');
quicksortDrawing.subscribe(quicksortBoard, 'comparison');

const insertionsortDrawing = new Drawing();
const insertionsortBoard = new Board(800, 200);
insertionsortBoard.setTitle('InsertionSort');
insertionsortBoard.setDisplay(new InfoDisplay());
insertionsortDrawing.add(insertionsortBoard);
insertionsortDrawing.subscribe(insertionsortBoard, 'swap');
insertionsortDrawing.subscribe(insertionsortBoard, 'comparison');

const selectionsortDrawing = new Drawing();
const selectionsortBoard = new Board(800, 200);
selectionsortBoard.setTitle('SelectionSort');
selectionsortBoard.setDisplay(new InfoDisplay());
selectionsortDrawing.add(selectionsortBoard);
selectionsortDrawing.subscribe(selectionsortBoard, 'swap');
selectionsortDrawing.subscribe(selectionsortBoard, 'comparison');

const bubblesortDrawing = new Drawing();
const bubblesortBoard = new Board(800, 200);
bubblesortBoard.setTitle('BubbleSort');
bubblesortBoard.setDisplay(new InfoDisplay());
bubblesortDrawing.add(bubblesortBoard);
bubblesortDrawing.subscribe(bubblesortBoard, 'swap');
bubblesortDrawing.subscribe(bubblesortBoard, 'comparison');

const cardsAttributes = getArrayOfRandomCardAttributes(20);

for(let cardAttribute of cardsAttributes) {
    let card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    mergesortBoard.addCard(card);

    card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    quicksortBoard.addCard(card);

    card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    insertionsortBoard.addCard(card);

    card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    selectionsortBoard.addCard(card);

    card = new Card(null, 30, cardAttribute.suit, cardAttribute.rank);
    bubblesortBoard.addCard(card);
}

const mergesortVisualizerAreaId = "visualiser-area-merge";
const quicksortVisualizerAreaId = "visualiser-area-quick";
const insertionSortVisualizerAreaId = "visualiser-area-insertion";
const selectionSortVisualizerAreaId = "visualiser-area-selection";
const bubbleSortVisualizerAreaId = "visualiser-area-bubble";

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

const mergeSortVisualisation = new Visualisation();
mergeSortVisualisation.setAlgorithm(mergesort)
    .setSortables(mergesortBoard.getCards())
    .setDrawing(mergesortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(mergesortVisualizerAreaId));
new p5(mergeSortVisualisation.run(), document.getElementById(mergesortVisualizerAreaId));

visualisations.push(mergeSortVisualisation);

const quickSortVisualisation = new Visualisation();
quickSortVisualisation.setAlgorithm(quicksort)
    .setSortables(quicksortBoard.getCards())
    .setDrawing(quicksortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(quicksortVisualizerAreaId));
new p5(quickSortVisualisation.run(), document.getElementById(quicksortVisualizerAreaId));

visualisations.push(quickSortVisualisation);

const insertionSortVisualisation = new Visualisation();
insertionSortVisualisation.setAlgorithm(insertionsort)
    .setSortables(insertionsortBoard.getCards())
    .setDrawing(insertionsortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(insertionSortVisualizerAreaId));
new p5(insertionSortVisualisation.run(), document.getElementById(insertionSortVisualizerAreaId));

visualisations.push(insertionSortVisualisation);

const selectionSortVisualisation = new Visualisation();
selectionSortVisualisation.setAlgorithm(selectionsort)
    .setSortables(selectionsortBoard.getCards())
    .setDrawing(selectionsortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(selectionSortVisualizerAreaId));
new p5(selectionSortVisualisation.run(), document.getElementById(selectionSortVisualizerAreaId));

visualisations.push(selectionSortVisualisation);

const bubbleSortVisualisation = new Visualisation();
bubbleSortVisualisation.setAlgorithm(bubblesort)
    .setSortables(bubblesortBoard.getCards())
    .setDrawing(bubblesortDrawing)
    .setEventFactory(eventFactory)
    .setSketchFactory(sketchFactory)
    .setDomElement(document.getElementById(bubbleSortVisualizerAreaId));
new p5(bubbleSortVisualisation.run(), document.getElementById(bubbleSortVisualizerAreaId));

visualisations.push(bubbleSortVisualisation);

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
