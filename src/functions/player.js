import { retrieveAndVisualise } from '../api';

class PlayerClass {
    constructor(document) {
        this.CANVAS = document.createElement('canvas');
        this.CANVAS.width = 1280;
        this.CANVAS.height = 720;
        document.body.appendChild(this.CANVAS);
        this.CONTEXT = this.CANVAS.getContext('2d');
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

    clearCanvas() {
        this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
    }

    drawBoundingBoxes(objects) {
        console.log(objects);
        // const canvas = document.createElement('canvas');

        // Clear the previous drawings
        this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);

        // Set some styles for the bounding boxes
        this.CONTEXT.lineWidth = '2';
        this.CONTEXT.strokeStyle = 'yellow';
        this.CONTEXT.font = '12px sans-serif';
        this.CONTEXT.fillStyle = 'blue';

        const start = objects[0];
        const x = 0;
        const y = 1;
        const startCoordX = objects[0][x] * this.CANVAS.width;
        const startCoordY = objects[0][y] * this.CANVAS.width;
        const width = (objects[1][x] - start[x]) * this.CANVAS.width;
        const height = (objects[3][y] - start[y]) * this.CANVAS.height;
        this.CONTEXT.strokeRect(startCoordX, startCoordY, width, height);

        // objects.forEach(function(each) {
        //     console.log(each);
        //     let x = each[0] * canvas.width;
        //     const y = each[1] * canvas.height;
        //     context.moveTo(x, y);
        // });
        // // context.stroke();
        // console.log('stroked');
        
        // Filter out objects that contain a class_name
        // objects.filter((object) => object.class_name).forEach(function(each) {
        //     console.log(each);
        //     let x = each.x * canvas.width;
        //     const y = each.y * canvas.height;
        //     const width = (each.width * canvas.width) - x;
        //     const height = (each.height * canvas.height) - y;

        //     // Draw the classification and the bounding boxes
        //     context.fillText(`${each.class_name} - ${Math.round(each.score * 100, 1)}%`, x + 5, y + 20);
        //     context.strokeRect(x, y, width, height);
        // });
    }

    drawGridBoxes() {

    }

    visualiseDensities() {

    }
}

export default PlayerClass;
