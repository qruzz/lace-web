import { retrieveAndVisualise } from '../api';

class PlayerClass {
    constructor(document, intervalFunc) {
        this.CANVAS = document.createElement('canvas');
        this.CANVAS.width = 1280;
        this.CANVAS.height = 720;
        document.body.appendChild(this.CANVAS);
        this.CONTEXT = this.CANVAS.getContext('2d');

        // The update interval
        this.UPDATE_INTERVAL = 1000;
        this.INTERVAL = setInterval(intervalFunc, this.UPDATE_INTERVAL);
    }

    startPlayer(callback) {
        retrieveAndVisualise().then(function(result) {
            if (!result) {
                console.log('There was no result');
                return (null);
            }

            callback(result);
        });
    }

    clearCanvas(intervalFunc) {
        this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
        intervalFunc();
        this.INTERVAL = setInterval(intervalFunc, this.UPDATE_INTERVAL);
    }

    drawBoundingBoxes(objects) {
        clearInterval(this.INTERVAL);

        // Set some styles for the bounding boxes
        this.CONTEXT.lineWidth = '2';
        this.CONTEXT.strokeStyle = 'yellow';
        this.CONTEXT.font = '12px sans-serif';
        this.CONTEXT.fillStyle = 'blue';

        const start = objects[0];
        const x = 0;
        const y = 1;
        const startCoordX = objects[0][x] * this.CANVAS.width;
        const startCoordY = objects[0][y] * this.CANVAS.height;
        const width = ((objects[1][x] - start[x]) * this.CANVAS.width);
        const height = ((objects[3][y] - start[y]) * this.CANVAS.height);
        this.CONTEXT.strokeRect(startCoordX, startCoordY, width, height);
    }

    drawGridBoxes() {

    }

    drawDensityGraph(graph) {
        clearInterval(this.INTERVAL);

        this.CONTEXT.lineWidth = '1';
        const eachWidth = this.CANVAS.width / graph.length;
        const eachHeight = this.CANVAS.height / graph.length;

        graph.forEach((each, rowIndex) => {
            each.forEach((each, index) => {
                if (each === 1) {
                    this.CONTEXT.strokeStyle = 'rgba(71, 222, 111, 1)';
                    this.CONTEXT.fillStyle = 'rgba(71, 222, 111, 0.3)';
                    this.CONTEXT.strokeRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                    this.CONTEXT.fillRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                } else if (each === 2) {
                    this.CONTEXT.strokeStyle = 'rgba(240, 162, 2, 1)';
                    this.CONTEXT.fillStyle = 'rgba(240, 162, 2, 0.3)';
                    this.CONTEXT.strokeRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                    this.CONTEXT.fillRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                } else if (each === 3) {
                    this.CONTEXT.strokeStyle = 'rgba(234, 64, 65, 1)';
                    this.CONTEXT.fillStyle = 'rgba(234, 64, 65, 0.3)';
                    this.CONTEXT.strokeRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                    this.CONTEXT.fillRect(index * eachWidth, rowIndex * eachHeight, eachWidth, eachHeight);
                }
            });
        });
    }
}

export default PlayerClass;
