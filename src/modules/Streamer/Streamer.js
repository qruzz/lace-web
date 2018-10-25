import React, { Component } from 'react';

import './Streamer.css';
import ObjDetect from '../../functions/objDetect';

export default class Streamer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			support:        null,
			mediaStream:    null,
		};
	}

	componentDidMount() {
		this.init();
	}

	componentWillUnmount() {
		this.VIDEO.removeEventListener(
			'playing',
			this.handleEventListener,
		);

		this.VIDEO.removeEventListener(
			'loadedmetadata',
			this.handleEventListener,
		);
	}

	init = () => {
		const support = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

		if (support) {
			let isPlaying = false;
			let loadedmetadata = false;

			this.OBJ_DETECT = new ObjDetect({
				videoRef:       	this.VIDEO,
				dataMirror:			false,
				dataUploadWidth:	1280,
				dataThreshold:		0.5,
			});

			this.VIDEO.addEventListener(
				'playing',
				this.handleEventListener('playing', 'loadedmetadata'),
			);

			this.VIDEO.addEventListener(
				'loadedmetadata',
				this.handleEventListener('loadedmetadata', 'playing'),
			);

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

	handleEventListener = (listener, opposer) => {
		listener = true;

		if (opposer) {
			this.OBJ_DETECT.startObjectDetection(document);
		}
	}

	renderCameraInput = () => {
		if (this.state.support && this.state.mediaStream) {
			this.VIDEO.srcObject = this.state.mediaStream;
		}

		return (
			<h1>{this.state.support}</h1>
		)
	}

	render() {
		return (
			<div className="stream-container">
				<div className="video-container">
					{this.renderCameraInput()}
					<video
						ref={(ref) => this.VIDEO = ref}
						className="video"
						id="video"
						muted
						playsInline
						autoPlay
					/>
				</div>
				<div className="button-container">

				</div>
			</div>
		);
	}
}
