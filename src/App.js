import React, { Component } from 'react';

import * as API from './api.js';
import ObjDetect from './functions/objDetect.js';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			support:		null,
			mediaStream:	null,
		};
	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		const support = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
		
		if (support) {
			let isPlaying = false;
			let gotMetadata = false;

			this.OBJ_DETECT = new ObjDetect({
				videoRef:			this.VIDEO,
				dataMirror:			false,
				dataUploadWidth:	1280,
				dataThreshold:		0.5,
			});

			this.VIDEO.addEventListener('playing', () => {
				isPlaying = true;

				if (gotMetadata) {
					this.OBJ_DETECT.startObjectDetection(document);
				}
			});

			this.VIDEO.addEventListener('loadedmetadata', () => {
				gotMetadata = true;

				if (isPlaying) {
					this.OBJ_DETECT.startObjectDetection(document);
				}
			});

			navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					width: { min: 640, ideal: 1280, max: 1920 },
					height: { min: 480, ideal: 720, max: 1080 },
				},
			}).then((stream) => {
				console.log(stream);

				this.setState({
					support: true,
					mediaStream: stream,
				});
			});
		} else {
			this.setState({
				support: 'getUserMedia() IS NOT supported by this browser',
			});
		}
	}

	renderCameraInput = () => {
		if (this.state.support && this.state.mediaStream) {
				this.VIDEO.srcObject = this.state.mediaStream;
		}

		return (
			<h1>{this.state.support}</h1>
		)
	};

	render() {
		return (
			<div className="App">
				<div className="video-container">
					{this.renderCameraInput()}
					<video
						ref={(ref) => this.VIDEO = ref}
						id="video"
						controls
						muted
						playsInline
						autoPlay
						height="608"
						width="608"
						className="video"
					/>
				</div>
				<div className="button-container">
				</div>
			</div>
		);
	}
}

export default App;
