import React, { Component } from 'react';

import ObjDetect from '../../functions/objDetect';

import './Streamer.css';

const logo = require('../../resources/logo.svg');

export default class Streamer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			started:		false,
			support:        null,
			mediaStream:    null,
		};
	}

	componentDidMount() {
		const user = localStorage.getItem('@User');

		if (!user) {
			this.props.history.push('/auth', 'stream');
		}
	}

	init = () => {
		const support = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
		let playing = false;
		let loadedmetadata = false;

		if (support) {
			this.OBJ_DETECT = new ObjDetect({
				videoRef:       	this.VIDEO,
				dataMirror:			false,
				dataUploadWidth:	1280,
				dataThreshold:		0.5,
			});

			this.VIDEO.addEventListener('playing', () => {
				playing = true;

				if (loadedmetadata) {
					this.OBJ_DETECT.startObjectDetection(document);
				}
			});

			this.VIDEO.addEventListener('loadedmetadata', () => {
				loadedmetadata = true;

				if (playing) {
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
	}

	renderInitialContainer = () => {
		const handleStartingStream = () => {
			this.setState({
				started: true,
			}, () => {
				this.init();
			});
		};

		return (
			<div className="initial-container">
				<img
					className="brand-logo"
					alt='lace'
					src={logo}
				/>
				<button
					className="stream-button"
					onClick={handleStartingStream}
				>
					Start Streaming
				</button>
			</div>
		);
	}

	renderStreamContainer = () => {
		return (
			<div className="stream-container">
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
		);
	}

	render() {
		return (
			<div className="main-container">
				{this.state.started ? 
					this.renderStreamContainer()
					:
					this.renderInitialContainer()
				}
			</div>
		);
	}
}
