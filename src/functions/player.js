import { retrieveAndVisualise } from '../api';

class Player {
    constructor() {

    }

    startPlayer(callback) {
        retrieveAndVisualise().then(function(error, result) {
            if (error) {
                console.log('There was no result', error);
                return (null);
            }

            console.log(result);
            callback(result);
            // This will be the recursive part
            this.startPlayer(callback);
        });
    }

    drawBoundingBoxes(document, objects) {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        const context = canvas.getContext('2d');

        // Clear the previous drawings
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set some styles for the bounding boxes
        context.lineWidth = '4';
        context.strokeStyle = 'yellow';
        context.font = '12px sans-serif';
        context.fillStyle = 'yellow';

        // Filter out objects that contain a class_name
        objects.filter((object) => object.class_name).forEach(function(each) {
            let x = each.x * canvas.width;
            const y = each.y * canvas.height;
            const width = (each.width * canvas.width) - x;
            const height = (each.height * canvas.height) - y;

            // Draw the classification and the bounding boxes
            context.fillText(`${each.class_name} - ${Math.round(each.score * 100, 1)}%`, x + 5, y + 20);
            context.strokeRect(x, y, width, height);
        });
    }

    drawGridBoxes() {

    }

    visualiseDensities() {

    }
}

export default Player;
