import * as API from '../api.js';

class ObjDetect {
    /**
     * The constructor is used to initialsise all the information
     * regarding the video stream and any other globals that needs
     * to be accessed from the class
     * @param {object} video Video object to initialise
     */
    constructor(video) {
        if (video) {
            this.VIDOE_REF = video.videoRef;
            this.DATA_SOURCE = video.dataSource;
            this.UPLOAD_WITH = video.dataUploadWidth || 640;
            this.MIRROR = video.mirror || false;
            this.THRESHOLD = video.scoreThreshold || 0.5;
        } else {
            new Error('Missing video object');
        }
    }

    /**
     * This function starts the object detection by grabbing an image
     * from the imagestream and and draw it in the canvas. It then converts
     * the canvas to an image blob and calls the API to stream them to the server.
     * This function is recursivly calling itself.
     * @param {document} document The DOM document
     * @returns {void}
     */
    startObjectDetection = (document) => {
        const canvas = document.createElement('canvas');
        
        // Set the width and height of the canvas capture
        canvas.width = this.UPLOAD_WITH;
        canvas.height = this.UPLOAD_WITH * (this.VIDOE_REF.videoHeight / this.VIDOE_REF.videoWidth);
        
        const context = canvas.getContext('2d');

        // Draw an image to the canvas from the videostream
        context.drawImage(this.VIDOE_REF, 0, 0, this.VIDOE_REF.videoWidth, this.VIDOE_REF.videoHeight,
            0, 0, this.UPLOAD_WITH, this.UPLOAD_WITH * (this.VIDOE_REF.videoHeight / this.VIDOE_REF.videoWidth));
            
        // Create a Blob object representing the image contained in the canvas
        canvas.toBlob((image) => {
            
            // Call the API, and start the image stream to the server
            API.streamAndDetect(image, null, () => {

                // Recursively call this function
                this.startObjectDetection(document);
            });
        }, 'image/jpeg');
    };

    /**
     * This function creates a canvas and appends it to the DOM document. It
     * then sorts the objects returned from the object detection API and draws
     * retangles in the specified coordinates.
     * @param {document} document The DOM document
     * @param {array} objects The detected objects
     * @returns {void}
     */
    drawBoundingBoxes = (document, objects) => {
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

        // Filter out objets that contain a class_name
        objects.filter((object) => object.class_name).forEach((each) => {
            let x = each.x * canvas.width;
            const y = each.y * canvas.height;
            const width = (each.width * canvas.width) - x;
            const height = (each.height * canvas.height) - y;

            // Flip the x-axis if local video is mirrored
            if (this.MIRROR) {
                x = canvas.width - (x + width);
            }

            // Draw the classification and the bounding boxes
            context.fillText(`${each.class_name} - ${Math.round(each.score * 100, 1)}%`, x + 5, y + 20);
            context.strokeRect(x, y, width, height);
        });
    };
};

export default ObjDetect;
